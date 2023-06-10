import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file) {
    return this.documentsService.saveDocument(file);
  }

  @Get(':id')
  async getDocument(@Param('id') id, @Res() res) {
    const document = await this.documentsService.getDocumentById(id);
    res.set('Content-Type', 'application/pdf');
    res.send(document.file);
  }
}
