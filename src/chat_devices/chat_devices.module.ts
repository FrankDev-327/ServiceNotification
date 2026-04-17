import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseServiceModule } from '../firebase-service/firebase-service.module';
import { ChatDevicesController } from './chat_devices.controller';
import { ChatDeviceTokenEntity } from '../entities/chat.device.token.entity';
import { ChatDevicesService } from './chat_devices.service';

@Module({
  imports: [
    FirebaseServiceModule,
    TypeOrmModule.forFeature([ChatDeviceTokenEntity]),
  ],
  providers: [ChatDevicesService],
  exports: [ChatDevicesService],
  controllers: [ChatDevicesController],
})
export class ChatDevicesModule {}
