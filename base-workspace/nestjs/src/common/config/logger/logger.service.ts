// src/shared/utils/logger.service.ts
import { LoggerService, Injectable } from '@nestjs/common';
import logger from './logger'; // Import cái file Winston bro đã fix lúc nãy

@Injectable()
export class MyWinstonLogger implements LoggerService {
  log(message: any) {
    logger.info(message);
  }

  error(message: any, trace: string) {
    logger.error(`${message} -> Stack: ${trace}`);
  }

  warn(message: any) {
    logger.warn(message);
  }

  debug(message: any) {
    logger.debug(message);
  }

  verbose(message: any) {
    logger.verbose(message);
  }
}
