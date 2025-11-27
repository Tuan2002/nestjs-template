import { Module } from '@nestjs/common';
import { S3FileService } from './services';

@Module({
  imports: [],
  controllers: [],
  providers: [S3FileService],
  exports: [S3FileService],
})
export class ThirdPartyModule { }
