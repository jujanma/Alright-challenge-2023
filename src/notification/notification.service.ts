// notification.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  sendNotification(email: string, notification: any): Promise<void> {
    // Implementa aquí la lógica para enviar la notificación al usuario con el correo electrónico proporcionado
    // Puedes utilizar bibliotecas o servicios de correo electrónico, notificaciones push, mensajes SMS, etc.

    // Ejemplo de implementación ficticia:
    console.log(`Enviando notificación a ${email}:`, notification);
    return Promise.resolve();
  }
}
