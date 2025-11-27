import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import { MESSAGES } from '@nestjs/core/constants';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const data =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
          };

    this.logger.warn(
      `[${request.method}] - [${status}] - [${request.url}] - ${exception}}`,
    );

    if (this.isExceptionObject(exception)) {
      this.logger.warn(exception.message, exception.stack);
    } else {
      this.logger.warn(exception);
    }

    response.status(status).json({
      statusCode: status,
      isSuccess: false,
      message:
        typeof data === 'string'
          ? data
          : (data as { message: string }).message ||
            MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
      timestamp: new Date().toISOString(),
      path: request.url,
      code: typeof data === 'string' ? '' : (data as { code: string }).code,
      // data: typeof data === 'string' ? data : { ...data, statusCode: status },
    });
  }

  public isExceptionObject(err: any): err is Error {
    return isObject(err) && !!(err as Error).message;
  }
}
