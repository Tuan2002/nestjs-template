import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiPropertyOptional,
  ApiQuery,
  PickType,
} from '@nestjs/swagger';
import { Filter, QueryOptionsDto } from '../dtos/query-options.dto';

export class QueryOptionsSwagger extends PickType(QueryOptionsDto, [
  'page',
  'limit',
  'search',
]) {
  @ApiPropertyOptional({
    type: 'object',
    properties: {},
    example: {
      sort: { field: 'desc' },
      filters: {
        field: { eq: 'abc' },
      },
    },
  })
  additionalQuery: Partial<{
    sort: Record<string, 'desc' | 'asc'>;
    filters: Record<string, Filter>;
  }>;
}

export class QueryOptionsBodySwagger {
  @ApiPropertyOptional({
    default: 1,
    description: 'Page number for pagination (1-based)',
    example: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    default: 20,
    description: 'Number of items per page (limit)',
    example: 20,
  })
  limit?: number;

  @ApiPropertyOptional({
    description: 'Global search term to filter across searchable fields',
    example: 'title or topic name or language name',
  })
  search?: string;

  @ApiPropertyOptional({
    type: 'object',
    description: 'Field-level filters with various operators',
    example: {
      category: { eq: 'Algorithms' },
      difficulty: { in: ['Easy', 'Medium', 'Hard'] },
      languageIds: { in: ['language-id2', 'language-id2'] },
      topicTagIds: { notIn: ['topic-tag-id1', 'topic-tag-id2'] },
    },
    additionalProperties: {
      type: 'object',
      properties: {
        eq: { type: 'string', description: 'Equal to' },
        neq: { type: 'string', description: 'Not equal to' },
        gt: { type: 'string', description: 'Greater than' },
        gte: { type: 'string', description: 'Greater than or equal' },
        lt: { type: 'string', description: 'Less than' },
        lte: { type: 'string', description: 'Less than or equal' },
        in: {
          type: 'array',
          items: { type: 'string' },
          description: 'Value in array',
        },
        nin: {
          type: 'array',
          items: { type: 'string' },
          description: 'Value not in array',
        },
      },
    },
  })
  filters?: Record<
    string,
    Partial<{
      eq: any;
      neq: any;
      gt: any;
      gte: any;
      lt: any;
      lte: any;
      in: any[];
      nin: any[];
    }>
  >;

  @ApiPropertyOptional({
    type: 'object',
    description: 'Sort configuration for multiple fields',
    example: {
      questionNumber: 'asc',
      createdAt: 'asc',
    },
    additionalProperties: {
      type: 'string',
      enum: ['asc', 'desc'],
    },
  })
  sort?: Record<string, 'asc' | 'desc'>;
}

export function ApiQueryOptions() {
  return applyDecorators(ApiQuery({ type: QueryOptionsSwagger }));
}

export function ApiBodyQueryOptions() {
  return applyDecorators(
    ApiBody({
      type: QueryOptionsBodySwagger,
    }),
  );
}
