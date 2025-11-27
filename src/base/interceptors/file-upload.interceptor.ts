import { S3Client } from '@aws-sdk/client-s3';
import {
  FileType,
  FileTypeSize,
  StorageFolders,
  StoragePermission,
} from '@base/enums';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { Observable } from 'rxjs';
import slug from 'slug';
import { fileFilter } from '../../utils';
import { FILE_UPLOAD_METADATA_KEY } from '../decorators';

interface FileUploadOptions {
  folder?: StorageFolders;
  fileTypes?: FileType[];
  permission?: StoragePermission;
  maxFileSize?: number;
}

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  private multerInstances = new Map<string, multer.Multer>();

  constructor(
    private readonly configService: ConfigService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const req = context.switchToHttp().getRequest();
    const options: FileUploadOptions =
      Reflect.getMetadata(FILE_UPLOAD_METADATA_KEY, context.getHandler()) || {};
    // Create a unique key for this configuration
    const configKey = JSON.stringify(options);

    // Get or create multer instance for this configuration
    if (!this.multerInstances.has(configKey)) {
      await this.initializeMulter(options, configKey);
    }
    const multerInstance = this.multerInstances.get(configKey)!;
    return new Promise((resolve, reject) => {
      multerInstance.single('file')(req, null, (error) => {
        if (error) {
          reject(
            new BadRequestException(`File upload error: ${error.message}`),
          );
          return;
        }
        resolve(next.handle());
      });
    });
  }

  private async initializeMulter(
    options: FileUploadOptions,
    configKey: string,
  ): Promise<void> {
    const {
      folder,
      fileTypes,
      permission = StoragePermission.PUBLIC,
      maxFileSize = FileTypeSize.MAX_OTHER_SIZE,
    } = options;

    // Get credentials from environment variables (already loaded by SecretManager)
    const accessKeyId = this.configService.get<string>('DO_SPACE_ACCESS_KEY');
    const secretAccessKey = this.configService.get<string>('DO_SPACE_SECRET_KEY');
    const endpoint = this.configService.get<string>('DO_SPACE_ENDPOINT');
    const region = this.configService.get<string>('DO_SPACE_REGION');
    const bucketName = this.configService.get<string>('DO_SPACE_BUCKET_NAME');
    if (!accessKeyId || !secretAccessKey) {
      throw new InternalServerErrorException({
        message:
          'S3 credentials not available. Ensure secrets are loaded from AWS Secret Manager',
      });
    }

    const s3Client = new S3Client({
      endpoint: endpoint,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
      region: region,
    });

    const multerInstance = multer({
      storage: multerS3({
        s3: s3Client,
        bucket: bucketName,
        acl: permission,
        metadata: (_req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
        },
        key: (_req, file, cb) => {
          const [fileName, fileExtension] = file.originalname.split('.');
          const fileKey = folder
            ? `${folder}/${Date.now()}-${slug(fileName)}.${fileExtension}`
            : `${Date.now()}-${slug(fileName)}.${fileExtension}`;
          cb(null, fileKey);
        },
      }),
      fileFilter: (_req, file, cb) =>
        fileFilter(_req, file, cb, fileTypes, maxFileSize),
    });

    this.multerInstances.set(configKey, multerInstance);
  }
}
