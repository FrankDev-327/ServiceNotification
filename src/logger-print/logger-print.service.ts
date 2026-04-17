import { createLogger, format, transports } from 'winston';
import { Injectable, LoggerService, LogLevel } from '@nestjs/common';

@Injectable()
export class LoggerPrintService implements LoggerService {
    private logger;
    constructor(fileCustomName: string) {
        this.logger = createLogger({
            level: 'info',
            format: format.combine(format.timestamp(), format.json()),
            transports: [new transports.File({ filename: `logs/${fileCustomName}.log` })],
        });

        if (process.env.NODE_ENV === 'dev') {
            this.logger.add(
                new transports.Console({
                    level: 'info',
                    format: format.combine(format.colorize(), format.simple()),
                }),
            );
        }
    }
    
    log(message: any, ...optionalParams: any[]) {
        this.logger.info(message, ...optionalParams);
    }
k
    warn(message: any, ...optionalParams: any[]) {
        this.logger.warn(message, ...optionalParams);
    }

    error(message: any, ...optionalParams: any[]) {
        this.logger.error(message, ...optionalParams);
    }

    debug(message: any, ...optionalParams: any[]) {
        this.logger.debug(message, ...optionalParams);
    }

    verbose(message: any, ...optionalParams: any[]) {
        this.logger.verbose(message, ...optionalParams);
    }
}
