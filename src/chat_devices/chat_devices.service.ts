import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDeviceDto } from '../dto/register.device.dto';
import { ChatDeviceTokenEntity } from '../entities/chat.device.token.entity';
import { deviceTokenCountGauge } from '../prometheus-notification/prometheus-notification-exporter';

@Injectable()
export class ChatDevicesService {
  constructor(
    @InjectRepository(ChatDeviceTokenEntity)
    private chatDeviceTokenRepository: Repository<ChatDeviceTokenEntity>,
  ) {}

  async registerDeviceToken(
    deviceDto: RegisterDeviceDto,
  ): Promise<ChatDeviceTokenEntity> {
    const existing = await this.chatDeviceTokenRepository.findOne({
      where: { token: deviceDto.token },
    });

    if (existing) {
      existing.userId = deviceDto.userId;
      existing.platform = deviceDto?.platform ?? null;
      deviceTokenCountGauge.inc({ platform: `${deviceDto.platform}-existing` });
      return this.chatDeviceTokenRepository.save(existing);
    }

    deviceTokenCountGauge.inc({ platform: `${deviceDto.platform}-new` });
    const newToken = this.chatDeviceTokenRepository.create({ ...deviceDto });
    return this.chatDeviceTokenRepository.save(newToken);
  }
}
