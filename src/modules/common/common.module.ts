import { SharedModule } from '@modules/shared/shared.module';
import { Module } from '@nestjs/common';
import { FileUploadController } from './controllers/file-upload.controller';
import { FileUploadService } from './services';

@Module({
  imports: [SharedModule],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class CommonModule { }
