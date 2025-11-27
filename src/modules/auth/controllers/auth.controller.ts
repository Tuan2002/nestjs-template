import { LOGOUT } from '@base/decorators/auth.decorator';
import { ApiResponseType } from '@base/decorators/response-swagger.decorator';
import { UserRequest } from '@base/decorators/user-request.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CredentialLoginDto, ForgetPasswordDto, InitialAdminDto } from '../dto';
import { AuthService } from '../services';
import { AuthorizedContext, ResponseToken } from '../types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Initialize admin account data',
  })
  @Post('initialize')
  async initializeDataAsync(@Body() initialData: InitialAdminDto) {
    return await this.authService.initializeDataAsync(initialData);
  }

  @ApiResponseType(ResponseToken)
  @ApiOperation({
    summary: 'Login with credentials',
  })
  @Post('credential-login')
  async credentialLoginAsync(@Body() authDto: CredentialLoginDto) {
    return await this.authService.credentialLoginAsync(authDto);
  }

  @ApiOperation({
    summary: 'Send forget password email',
  })
  @Post('forget-password')
  async forgetPasswordAsync(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return await this.authService.forgetPasswordAsync(forgetPasswordDto);
  }
  
  @ApiOperation({
    summary: 'Logout user and revoke access token',
    description: 'Revoke the current access token and log out the user',
  })
  @LOGOUT()
  @Post('logout')
  async logoutAsync(@UserRequest() context: AuthorizedContext) {
    return await this.authService.logoutAsync(context);
  }
}
