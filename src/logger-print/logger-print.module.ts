import { Global, Module } from '@nestjs/common';
import { LoggerPrintService } from './logger-print.service';

@Global()
@Module({
    providers: [
        {
            provide: LoggerPrintService,
            useFactory: () => {
                const fileCustomName = 'application'; // You can set this dynamically or retrieve from config
                return new LoggerPrintService(fileCustomName);
            },
        },
    ],
    exports: [LoggerPrintService],
})
export class LoggerPrintModule { }
