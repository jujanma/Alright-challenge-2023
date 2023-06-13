import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { User } from '../users/user.entity';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly notificationService: NotificationService,
  ) {}

  async saveDocument(file): Promise<Document> {
    const document = new Document();
    document.file = file.buffer;
    return this.documentRepository.save(document);
  }

  async getDocumentById(id): Promise<Document> {
    return this.documentRepository.findOne(id);
  }
  // async requestReview(documentId: number, reviewerId: number): Promise<void> {
  //   const document = await this.documentRepository.findOne(documentId);
  //   if (!document) {
  //     throw new Error('Documento no encontrado');
  //   }

  //   const reviewer = await this.userRepository.findOne(reviewerId);
  //   if (!reviewer) {
  //     throw new Error('Revisor no encontrado');
  //   }

  //   const notification = {
  //     message: `Has recibido una solicitud de revisión para el documento "${document.name}"`,
  //     documentId: document.id,
  //     reviewerId: reviewer.id,
  //   };

  //   await this.notificationService.sendNotification(reviewer.email, notification);

  //   document.status = 'En revisión';
  //   await this.documentRepository.save(document);
  // }
  async requestReview(documentId: number, reviewerId: number): Promise<void> {
    const document = await this.documentRepository.findOne({
      where: { id: documentId },
    });
    if (!document) {
      throw new Error('Documento no encontrado');
    }

    const reviewer = await this.userRepository.findOne({
      where: { id: reviewerId },
    });
    if (!reviewer) {
      throw new Error('Revisor no encontrado');
    }

    const notification = {
      message: `Has recibido una solicitud de revisión para el documento "${document.name}"`,
      documentId: document.id,
      reviewerId: reviewer.id,
    };

    await this.notificationService.sendNotification(
      reviewer.email,
      notification,
    );

    document['status'] = 'En revisión';
    await this.documentRepository.save(document);
  }
}
