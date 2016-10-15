const Hapi = require('hapi');
const Path = require('path');


const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 1818
});


server.register(require('inert'), err => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/public/{param}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: 'src/index.html'
    }
  });

  server.start(err => {
    if (err) {
      throw err
    }


    console.log('Server running at: ', server.info.uri);
  });
});

