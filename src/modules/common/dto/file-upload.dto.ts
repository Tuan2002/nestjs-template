import { FileType, FileTypeSize } from "@/base/enums";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max } from "class-validator";

export class UploadAvatarDto {
  @ApiProperty({
    description: 'The name of the file to be uploaded',
    example: 'avatar.png',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  fileName: string;

  @ApiProperty({
    description: 'The type of the file to be uploaded',
    example: FileType.IMAGE_PNG,
  })
  @IsNotEmpty()
  @IsEnum([
    FileType.IMAGE_JPEG,
    FileType.IMAGE_JPG,
    FileType.IMAGE_PNG,
    FileType.IMAGE_WEBP
  ])
  fileType: FileType;

  @ApiProperty({
    description: 'The size of the file to be uploaded in bytes',
    example: 204800,
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(FileTypeSize.MAX_IMAGE_SIZE)
  fileSize: number;
}

export class UploadAuthorImageDto {
  @ApiProperty({
    description: 'The name of the file to be uploaded',
    example: 'avatar.png',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  fileName: string;

  @ApiProperty({
    description: 'The type of the file to be uploaded',
    example: FileType.IMAGE_PNG,
  })
  @IsNotEmpty()
  @IsEnum([
    FileType.IMAGE_JPEG,
    FileType.IMAGE_JPG,
    FileType.IMAGE_PNG,
    FileType.IMAGE_WEBP
  ])
  fileType: FileType;

  @ApiProperty({
    description: 'The size of the file to be uploaded in bytes',
    example: 204800,
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(FileTypeSize.MAX_IMAGE_SIZE)
  fileSize: number;
}

export class UploadAuthorDocumentDto {
  @ApiProperty({
    description: 'The name of the file to be uploaded',
    example: 'avatar.png',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  fileName: string;

  @ApiProperty({
    description: 'The type of the file to be uploaded',
    example: FileType.IMAGE_PNG,
  })
  @IsNotEmpty()
  @IsEnum([
    FileType.IMAGE_JPEG,
    FileType.IMAGE_JPG,
    FileType.IMAGE_PNG,
    FileType.IMAGE_WEBP,
    FileType.PDF
  ])
  fileType: FileType;

  @ApiProperty({
    description: 'The size of the file to be uploaded in bytes',
    example: 204800,
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(FileTypeSize.MAX_DOCUMENT_SIZE)
  fileSize: number;
}

export class FileUploadResponseDto {
  @ApiProperty({
    description: 'The URL to upload the file',
    example: 'https://s3.amazonaws.com/bucket-name/upload-url',
  })
  @IsNotEmpty()
  @IsString()
  uploadUrl: string;

  @ApiProperty({
    description: 'The URL to access the uploaded file',
    example: 'https://s3.amazonaws.com/bucket-name/access-url',
  })
  @IsNotEmpty()
  @IsString()
  accessUrl: string;
}