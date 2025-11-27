import { FileTypeSize } from '@base/enums/file-size.enum';
import { FileType } from '@base/enums/file.enum';
import { StorageFolders } from '@base/enums/storage-folder.enum';
import { StoragePermission } from '@base/enums/storage-permission.enum';
import { FileUploadInterceptor } from '@base/interceptors/file-upload.interceptor';
import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';

export const FILE_UPLOAD_METADATA_KEY = 'fileUploadOptions';
export function FilesUpload(
  folder?: StorageFolders,
  fileTypes?: FileType[],
  permission: StoragePermission = StoragePermission.PUBLIC,
  maxFileSize: number = FileTypeSize.MAX_OTHER_SIZE,
) {
  return applyDecorators(
    SetMetadata(FILE_UPLOAD_METADATA_KEY, {
      folder,
      fileTypes,
      permission,
      maxFileSize,
    }),
    UseInterceptors(FileUploadInterceptor),
  );
}
