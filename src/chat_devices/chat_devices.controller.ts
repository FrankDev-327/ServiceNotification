import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDeviceDto } from '../dto/register.device.dto';
import { ChatDevicesService } from './chat_devices.service';
import { ChatDeviceTokenEntity } from '../entities/chat.device.token.entity';

@Controller('chat-devices')
export class ChatDevicesController {
  constructor(private chatDevicesService: ChatDevicesService) {}

  @Post('/register')
  async registerDevice(
    @Body() body: RegisterDeviceDto,
  ): Promise<ChatDeviceTokenEntity> {
    return await this.chatDevicesService.registerDeviceToken(body);
  }
}
