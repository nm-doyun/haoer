# Haoer

Haoer es una clase de framework que permite crear un servidor web en Node.js. Es similar a otros como Express, pero es mucho más pequeño y fácil de entender.
# Actualización de Haoer - Nuevas Funciones

- ## Mejoras en el código
  Hemos realizado mejoras significativas en el código de Haoer para garantizar una mayor seguridad y una mayor eficiencia en el procesamiento de datos.

- ## Código moderno
  También hemos actualizado el código de Haoer para que sea más moderno y compatible con las últimas tecnologías. Esto significa que nuestra aplicación es ahora más rápida, más estable y más fácil de usar que nunca.

- # Pronto habra nuevas funciones..!

# Instalación
Para utilizar haoer, primero debes instalarlo usando npm o yarn:

` npm i haoer o yarn add haoer `

Luego, puedes importarlo a tu proyecto de Node.js:
```
const haoer = require('haoer');
const app = haoer();
```

# Uso
Una vez que has creado una instancia de haoer, puedes definir rutas y manejar solicitudes HTTP. Por ejemplo, aquí está cómo puedes definir una ruta GET para la raíz del sitio:

```js
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
```
Y aquí está cómo puedes definir una ruta POST para procesar datos de formulario:
```js
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  // Do something with the form data
  res.send('Thanks for submitting the form!');
});
```
También puedes agregar middleware para manejar solicitudes de manera más flexible. Por ejemplo, aquí hay un middleware que sirve archivos estáticos desde un directorio:

```js
app.use(haoer.static('./public'));
```

# API

## app.get(path, handler)

Define una ruta para solicitudes HTTP GET.

- path (string): La ruta de la solicitud.
- handler (función): La función que maneja la solicitud. Debe tomar dos argumentos, el objeto req de la solicitud y el objeto res de la respuesta.

## app.post(path, handler)
Define una ruta para solicitudes HTTP POST.

- path (string): La ruta de la solicitud.
- handler (función): La función que maneja la solicitud. Debe tomar dos argumentos, el objeto req de la solicitud y el objeto res de la respuesta.

## app.use(middleware)
Agrega un middleware al servidor web.

- middleware (función): La función de middleware. Debe tomar tres argumentos, el objeto req de la solicitud, el objeto res de la respuesta y la función next().
haoer.static(directory)
Una función de middleware que sirve archivos estáticos desde un directorio.

- directory (string): El directorio que contiene los archivos estáticos.
app.listen(port)
Inicia el servidor web y escucha en un puerto dado.

port (number): El número de puerto en el que escuchar.