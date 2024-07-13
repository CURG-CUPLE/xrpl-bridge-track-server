import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import { Injectable, LoggerService } from '@nestjs/common';
import process from 'process';
import _ from 'lodash';

@Injectable()
export class WinstonLoggerConfigService implements LoggerService {
  private readonly logger: winston.Logger;
  private appName = process.env.APPLICATION_NAME || 'app';
  private env = process.env.NODE_ENV || 'env';

  private readonly logPrefix = `[${this.env}.${this.appName}]`;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(this.appName, {
              prettyPrint: true,
              colors: true,
            }),
          ),
        }),
      ],
    });
  }

  error(message: string, functionName: string, ...optionalParams: any[]): any {
    optionalParams = this.hideOptionalParameterSecurityInfo(optionalParams);
    this.logger.error(`${this.logPrefix}[func:${functionName}] ${message}`, optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    optionalParams = this.hideOptionalParameterSecurityInfo(optionalParams);
    this.logger.info(message, optionalParams);
  }

  warn(message: string, functionName: string, ...optionalParams: any[]): any {
    optionalParams = this.hideOptionalParameterSecurityInfo(optionalParams);
    this.logger.warn(`${this.logPrefix}[func:${functionName}] ${message}`, optionalParams);
  }

  hideOptionalParameterSecurityInfo(...optionalParams: any[]) {
    if (typeof optionalParams[0] === 'object') {
      for (const [, value] of Object.entries(optionalParams[0])) {
        if (_.get(value, 'config.auth.username', undefined)) {
          value['config']['auth']['username'] = '****';
        }
        if (_.get(value, 'config.auth.password', undefined)) {
          value['config']['auth']['password'] = '****';
        }
      }
    }
    return optionalParams;
  }
}
