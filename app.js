import Server from './server.js';
import config from './config.js';

console.log('Arrancando el servidor...');

const server = new Server(config.PORT);
server.start();
