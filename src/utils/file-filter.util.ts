import { FileType } from '@base/enums/file.enum';
import { BadRequestException } from '@nestjs/common';

/**
 * Filters files based on allowed file types and maximum file size.
 * @param file - The file to be checked.
 * @param cb - Callback function to indicate whether the file is valid or not.
 * @param allowedFileTypes - Array of allowed file types.
 * @param maxFileSize - Maximum allowed file size in bytes.
 */

export function fileFilter(
  req,
  file,
  cb,
  allowedFileTypes?: FileType[],
  maxFileSize?: number,
) {
  if (!file) {
    return cb(null, true);
  }

  const requestFileSize = req.headers['content-length']
    ? parseInt(req.headers['content-length'])
    : 0;
  if (maxFileSize && requestFileSize > maxFileSize) {
    return cb(
      new BadRequestException({
        message: `File size exceeds the maximum limit of ${maxFileSize / 1024} KB`,
      }),
      false,
    );
  }

  if (
    allowedFileTypes &&
    !allowedFileTypes.includes(file.mimetype as FileType)
  ) {
    return cb(
      new BadRequestException({
        message: `File type ${file.mimetype} is not allowed. Allowed types are: ${allowedFileTypes.join(', ')}`,
      }),
      false,
    );
  }
  return cb(null, true);
}
