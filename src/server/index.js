require('dotenv').config();
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const db = require('./db');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;

function onUnhandledError(err) {
  try {
    logger.error(err);
  } catch (e) {
    console.log('LOGGER ERROR:', e); //eslint-disable-line no-console
    console.log('APPLICATION ERROR:', err); //eslint-disable-line no-console
  }
  process.exit(1);
}

process.on('unhandledRejection', onUnhandledError);
process.on('uncaughtException', onUnhandledError);

const setupAppRoutes =
  process.env.NODE_ENV === 'development' ? require('./middlewares/development') : require('./middlewares/production');

const app = express();

app.set('env', process.env.NODE_ENV);
logger.info(`Application env: ${process.env.NODE_ENV}`);
app.use(function(req, res, next) {
  setTimeout(next, 1000);
});
app.use(logger.expressMiddleware);
app.use(bodyParser.json());
app.use(require('./routes'));

// application routes
setupAppRoutes(app);
if (require.main === module) {
  db.connect()
    .then(() => {
      http.createServer(app).listen(process.env.PORT, () => {
        logger.info(`HTTP server is now running on http://localhost:${process.env.PORT}`);
      });
    })
    .catch((err) => logger.error(err));
}
module.exports = app;
