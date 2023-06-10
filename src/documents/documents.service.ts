import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async saveDocument(file): Promise<Document> {
    const document = new Document();
    document.file = file.buffer;
    return this.documentRepository.save(document);
  }

  async getDocumentById(id): Promise<Document> {
    return this.documentRepository.findOne(id);
  }
}
