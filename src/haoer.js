const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const { getRequestBody } = require('./utils');

class haoer {
  constructor() {
    this.routes = [];
    this.middlewares = [];
  }

  get(path, handler) {
    this.routes.push({ method: 'GET', path, handler });
  }

  post(path, handler) {
    this.routes.push({ method: 'POST', path, handler });
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  handleRequest(req, res) {
    const { method, url } = req;

    // Apply middlewares
    let idx = 0;

    const next = () => {
      if (idx >= this.middlewares.length) {
        return this.handleRoute(req, res);
      }

      const middleware = this.middlewares[idx];
      idx++;

      middleware(req, res, next);
    };

    next();
  }

  async handleRoute(req, res) {
    const { method, url } = req;
  
    const route = this.routes.find(
      route => route.method === method && route.path === url
    );
  
    if (!route) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not found');
      return;
    }
  
    try {
      if (method === 'POST') {
        // Parse request body
        const body = await getRequestBody(req);
        req.body = querystring.parse(body);
      }
  
      // Add custom "send" function to "res"
      res.send = (data) => {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      };

    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal server error');
    }
  }

  static(directory) {
    return (req, res, next) => {
      // Serve static files
      const path = req.url === '/' ? '/index.html' : req.url;
      const file = directory + path;

      fs.readFile(file, (err, data) => {
        if (err) {
          next();
        } else {
          res.setHeader('Content-Type', getContentType(path));
          res.end(data);
        }
      });
    };
  }

  listen(port) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

function getContentType(path) {
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
  };

  const extension = path.slice(path.lastIndexOf('.')).toLowerCase();

  return contentTypes[extension] || 'text/plain';
}

module.exports = haoer;