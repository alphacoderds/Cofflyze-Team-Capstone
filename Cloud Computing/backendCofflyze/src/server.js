import Hapi from '@hapi/hapi';
import routes from './routes.js';

const init = async () => {
    const server = Hapi.server({
        port: 8080,
        host: 'localhost',
    });

    server.route(routes);

    server.route({
        method: 'GET',
        path: '/status',
        handler: (request, h) => {
            return h.response({ message: 'Server is up and running!' }).code(200);
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
