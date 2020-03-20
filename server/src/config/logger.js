import bunyan from 'bunyan';

const log = {
  development: () =>
    bunyan.createLogger({ name: `development`, level: 'debug' }),
  production: () => bunyan.createLogger({ name: `production`, level: 'info' }),
  test: () => bunyan.createLogger({ name: `test`, level: 'debug' })
};

export default () => {
  return log[process.env.NODE_ENV || 'development']();
};
