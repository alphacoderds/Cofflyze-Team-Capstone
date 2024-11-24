import { getUsers, addUser, updateUser, deleteUser } from './handlers/user_handler.js';
import { getInformasi, addInformasi, updateInformasi, deleteInformasi } from './handlers/informasi_handler.js';
import { getDeteksi, addDeteksi, updateDeteksi, deleteDeteksi } from './handlers/deteksi_handler.js';
import { getPohon, addPohon, updatePohon, deletePohon } from './handlers/pohon_handler.js';

const routes = [
    {
        method: 'GET',
        path: '/hello',
        handler: (request, h) => {
            return h.response({ message: 'Hello, world!' }).code(200);
        },
    },

    { method: 'GET', path: '/users', handler: getUsers },
    { method: 'POST', path: '/users', handler: addUser },
    { method: 'PUT', path: '/users/{idUser}', handler: updateUser },
    { method: 'DELETE', path: '/users/{idUser}', handler: deleteUser },

    { method: 'GET', path: '/informasi', handler: getInformasi },
    { method: 'POST', path: '/informasi', handler: addInformasi },
    { method: 'PUT', path: '/informasi/{idInformasi}', handler: updateInformasi },
    { method: 'DELETE', path: '/informasi/{idInformasi}', handler: deleteInformasi },

    { method: 'GET', path: '/deteksi', handler: getDeteksi },
    { method: 'POST', path: '/deteksi', handler: addDeteksi },
    { method: 'PUT', path: '/deteksi/{idDeteksi}', handler: updateDeteksi },
    { method: 'DELETE', path: '/deteksi/{idDeteksi}', handler: deleteDeteksi },

    { method: 'GET', path: '/pohon', handler: getPohon },
    { method: 'POST', path: '/pohon', handler: addPohon },
    { method: 'PUT', path: '/pohon/{idPohon}', handler: updatePohon },
    { method: 'DELETE', path: '/pohon/{idPohon}', handler: deletePohon },
];

export default routes;
