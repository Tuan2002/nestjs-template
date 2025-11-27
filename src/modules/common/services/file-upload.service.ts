import { BucketFolders } from '@/enums';
import { S3FileService } from '@/modules/third-party/services';
import { BadRequestException, Injectable } from '@nestjs/common';
import slug from 'slug';
import { CommonErrorCode } from '../constants';
import {
  FileUploadResponseDto,
  UploadAuthorDocumentDto,
  UploadAuthorImageDto,
  UploadAvatarDto
} from '../dto';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly s3FileService: S3FileService,
  ) { }

  async generateUploadAvatarUrl(fileMetadata: UploadAvatarDto): Promise<FileUploadResponseDto> {
    const { fileName, fileType, fileSize } = fileMetadata;
    const [originalName, fileExt] = fileName.split('.')
    const fileKey = `${BucketFolders.USER_AVATARS}/${slug(originalName)}-${Date.now()}.${fileExt}`;
    const presignedData = await this.s3FileService.generateUploadUrl({
      fileKey,
      fileType,
      fileSize
    }).catch(() => {
      throw new BadRequestException({
        message: 'Failed to generate upload URL',
        code: CommonErrorCode.UPLOAD_FAILED
      })
    });
    return presignedData;
  }

  async generateUploadAuthorUrl(fileMetadata: UploadAuthorImageDto): Promise<FileUploadResponseDto> {
    const { fileName, fileType, fileSize } = fileMetadata;
    const [originalName, fileExt] = fileName.split('.')
    const fileKey = `${BucketFolders.AUTHOR_IMAGES}/${slug(originalName)}-${Date.now()}.${fileExt}`;
    const presignedData = await this.s3FileService.generateUploadUrl({
      fileKey,
      fileType,
      fileSize
    }).catch(() => {
      throw new BadRequestException({
        message: 'Failed to generate upload URL',
        code: CommonErrorCode.UPLOAD_FAILED
      })
    });
    return presignedData;
  }

  async generateUploadAuthorDocsUrl(fileMetadata: UploadAuthorDocumentDto): Promise<FileUploadResponseDto> {
    const { fileName, fileType, fileSize } = fileMetadata;
    const [originalName, fileExt] = fileName.split('.')
    const fileKey = `${BucketFolders.AUTHOR_DOCUMENTS}/${slug(originalName)}-${Date.now()}.${fileExt}`;
    const presignedData = await this.s3FileService.generateUploadUrl({
      fileKey,
      fileType,
      fileSize
    }).catch(() => {
      throw new BadRequestException({
        message: 'Failed to generate upload URL',
        code: CommonErrorCode.UPLOAD_FAILED
      })
    });
    return presignedData;
  }
}
