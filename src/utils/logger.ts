/* istanbul ignore file */

import * as winston from 'winston'
import { pid } from 'process';
import config from '../config'
import { Request, Response, NextFunction } from 'express';

// npm debug levels (winston default):
// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }

const customFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  const className = label ? label.toUpperCase() : '';
  return `[${level}-${className}:${pid}] ${timestamp} ${message}`;
});

const prettyJson = winston.format.printf(info => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4)
  }
  return `${info.timestamp} ${info.label || '-'} ${info.level}: ${info.message}`
})


export function httpLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const startTime = new Date().getTime();

  res.on('finish', () => {
    const duration = new Date().getTime() - startTime;
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: duration + 'ms',
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    };
    logger.info(logData);
  });

  next();
}

const logger = winston.createLogger({
  level: config.loggerLevel === 'silent' ? undefined : config.loggerLevel,
  silent: config.loggerLevel === 'silent',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
    prettyJson
  ),
  defaultMeta: {service: 'typescript-backend'},
  transports: [new winston.transports.Console({})]
})

export default logger
