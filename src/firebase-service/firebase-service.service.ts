import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { join } from 'path';
import { LoggerPrintService } from '../logger-print/logger-print.service';
import { numberCountFirebaseNotificationSent } from '../prometheus-notification/prometheus-notification-exporter';

@Injectable()
export class FirebaseServiceService implements OnModuleInit {
  constructor(private loggerPrintService: LoggerPrintService) {}

  onModuleInit() {
    const pathFirebaseConfig =
      'chatskytrackapp-firebase-adminsdk-fbsvc-10b7744d83.json';
    const serviceAccountPath = join(process.cwd(), pathFirebaseConfig);
    const serviceAccount = require(serviceAccountPath) as ServiceAccount;
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      this.loggerPrintService.log('Firebase initialized successfully');
    }
  }

  async sendNotification(
    tokens: string[],
    title: string = 'chat notification',
    body,
  ): Promise<void> {
    const message = {
      notification: { title, ...body },
      tokens,
    };
    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log(JSON.stringify(response, null, 2));
      if (response.failureCount > 0) {
        numberCountFirebaseNotificationSent.dec({
          notificationType: 'fire_base_notify_failed',
        });
      }

      if (response.successCount > 0) {
        numberCountFirebaseNotificationSent.dec({
          notificationType: 'fire_base_notify_success',
        });
      }

      this.loggerPrintService.log('Firebase sent message', response);
    } catch (error) {
      numberCountFirebaseNotificationSent.dec({
        notificationType: 'fire_base_notify_failed',
      });
    }
  }
}
