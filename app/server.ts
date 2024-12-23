import { logger, type NodeSystemError } from '@siloamhospitals/erp-template-expressjs-library';
import debug from 'debug';
import { createServer } from 'http';
import app from './app';
import { config } from './config';

debug('template-expressjs:server');

const server = createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): number {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    throw new Error(`error in port number : ${val}`);
  }
  if (port < 0) {
    // port number
    throw new Error(`error in port number : ${val}`);
  }

  return port;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeSystemError): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error('requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error('Port is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
  const addr = server.address();
  const bind = addr !== null ? (typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port.toString()) : '???';
  logger.info('Listening on ' + bind);
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(config.app.port.toString());
app.set('port', port);

/**
 * Create HTTP server.
 */

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
