import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsController } from './documents/documents.controller';
import { Document } from './documents/document.entity';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'pruebaAlright',
      password: 'prueba',
      database: 'bd_prueba_alright',
      entities: [],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads', // Carpeta donde se guardarán los archivos PDF
    }),
    TypeOrmModule.forFeature([Document]),
  ],
  controllers: [AppController, DocumentsController, UsersController],
  providers: [AppService],
})
export class AppModule {}
