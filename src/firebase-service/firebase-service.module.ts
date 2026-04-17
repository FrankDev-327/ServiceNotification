import { Module } from '@nestjs/common';
import { LoggerPrintService } from '../logger-print/logger-print.service';
import { FirebaseServiceService } from './firebase-service.service';
import { FirebaseServiceController } from './firebase-service.controller';

@Module({
  exports: [FirebaseServiceService],
  providers: [FirebaseServiceService, {
    provide: LoggerPrintService,
    useValue: new LoggerPrintService(FirebaseServiceService.name),
  }],
  controllers: [FirebaseServiceController],
})
export class FirebaseServiceModule { }
