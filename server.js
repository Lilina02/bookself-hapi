const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');
const {
  getAllBooksHandler,
  addBookHandler,
  editBookHandler,
  deleteBookHandler,
} = require('./handlers/booksHandler');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: true,
      payload: {
        parse: true,
        allow: 'application/json',
      },
    },
  });

  await server.register(Inert);

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.file(Path.join(__dirname, 'public', 'index.html'));
    },
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'public'),
        listing: false,
        index: false,
      },
    },
  });

  server.route([
    {
      method: 'GET',
      path: '/books',
      handler: getAllBooksHandler,
    },
    {
      method: 'POST',
      path: '/books',
      handler: async (request, h) => {
        console.log('POST /books payload:', request.payload);
        return addBookHandler(request, h);
      },
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: editBookHandler,
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: deleteBookHandler,
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
