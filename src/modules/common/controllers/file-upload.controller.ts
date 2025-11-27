import {
  ApiResponseType,
  Auth
} from '@base/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUploadResponseDto, UploadAvatarDto } from '../dto';
import { FileUploadService } from '../services';

@ApiTags('File Uploads')
@Auth()
@Controller('uploads')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @Post('profile-image')
  @ApiOperation({ summary: 'Upload user profile image' })
  @ApiResponseType(FileUploadResponseDto)
  async uploadProfileImage(
    @Body() fileMetadata: UploadAvatarDto
  ) {
    return this.fileUploadService.generateUploadAvatarUrl(fileMetadata);
  }

  @Post('author-image')
  @ApiOperation({ summary: 'Upload author image' })
  @ApiResponseType(FileUploadResponseDto)
  async uploadAuthorImage(
    @Body() fileMetadata: UploadAvatarDto
  ) {
    return this.fileUploadService.generateUploadAuthorUrl(fileMetadata);
  }

  @Post('author-document')
  @ApiOperation({ summary: 'Upload author document' })
  @ApiResponseType(FileUploadResponseDto)
  async uploadAuthorDocument(
    @Body() fileMetadata: UploadAvatarDto
  ) {
    return this.fileUploadService.generateUploadAuthorDocsUrl(fileMetadata);
  }
}
