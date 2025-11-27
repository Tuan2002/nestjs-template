import { StoragePermission } from '@/base/enums';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { SecurityOptions } from '@constants';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadParamDto } from '../dto';
import { PresignedUploadData } from '../types';

@Injectable()
export class S3FileService {
  private s3Client: S3Client;
  constructor(
    private readonly configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      endpoint: this.configService.getOrThrow<string>('S3_API_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>('S3_SECRET_ACCESS_KEY'),
      },
      region: this.configService.get<string>('S3_REGION') || 'us-east-1',
      forcePathStyle: true
    });
  }

  async generateUploadUrl(
    uploadParams: UploadParamDto,
    expiresIn?: number,
    permission: StoragePermission = StoragePermission.PUBLIC,
  ): Promise<PresignedUploadData> {
    const bucketEndpoint = this.configService.getOrThrow<string>('S3_API_ENDPOINT');
    const cdnEndpoint = this.configService.getOrThrow<string>('S3_CDN_ENDPOINT');
    const bucketName = this.configService.getOrThrow<string>('S3_BUCKET_NAME');
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uploadParams.fileKey,
      ACL: permission,
      ContentType: uploadParams.fileType,
      ContentLength: uploadParams.fileSize
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: expiresIn || SecurityOptions.FILE_SIGN_TIME,
    });

    const accessUrl = cdnEndpoint
      ? `${cdnEndpoint}/${uploadParams.fileKey}`
      : `${bucketEndpoint}/${bucketName}/${uploadParams.fileKey}`;
    return {
      uploadUrl,
      accessUrl,
    }
  }
}
