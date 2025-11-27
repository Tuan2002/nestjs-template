import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseApp, ResponseAppPagination } from '../types';

interface ApiResponseTypeOptions {
  isArray?: boolean;
  hasPagination?: boolean;
}

export const ApiResponseType = <TModel extends Type<any>>(
  model: TModel,
  options: ApiResponseTypeOptions = { isArray: false, hasPagination: false },
) => {
  const properties = options.isArray
    ? {
      data: {
        type: 'array',
        items: { $ref: getSchemaPath(model) },
      },
    }
    : {
      data: {
        type: 'object',
        $ref: getSchemaPath(model),
      },
    };
  const responseType = options.hasPagination ? ResponseAppPagination : ResponseApp;
  return applyDecorators(
    ApiExtraModels(responseType, model),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(responseType) },
          {
            properties,
          },
        ],
      },
    }),
  );
};
