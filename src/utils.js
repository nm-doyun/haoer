const { Readable } = require('stream');

const getRequestBody = async (req) => {
  let body = '';

  for await (const chunk of req) {
    body += chunk.toString();
  }

  return body;
};

const createReadStreamFromBuffer = (buffer) => {
  const readable = Readable.from(buffer);
  return readable;
};

module.exports = { getRequestBody, createReadStreamFromBuffer };