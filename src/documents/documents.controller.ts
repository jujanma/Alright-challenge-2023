import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly documentService: DocumentsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file): Promise<Document> {
    const document = new Document();
    document.name = file.originalname;
    document.location = file.path;

    return this.documentRepository.save(document);
  }

  @Post(':id/request-review/:reviewerId')
  async requestReview(
    @Param('id') documentId: number,
    @Param('reviewerId') reviewerId: number,
  ) {
    try {
      await this.documentService.requestReview(documentId, reviewerId);
      return { message: 'Solicitud de revisión enviada' };
    } catch (error) {
      throw new Error('Error al enviar la solicitud de revisión');
    }
  }

  @Get('preview/:id')
  async previewDocument(@Param('id') id: number): Promise<string> {
    const document = await this.documentService.getDocumentById(id);
    return document.file; // Suponiendo que 'file' contiene la URL de la vista previa del documento
  }
}
