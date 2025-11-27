import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { Filter, QueryOptionsDto } from '../dtos/query-options.dto';
import { QueryOperator } from '../enums';
interface Options {
  keepRawFilters?: boolean;
  acceptFilterFields?: Array<
    | string
    | {
      name: string;
      type?:
      | StringConstructor
      | NumberConstructor
      | BooleanConstructor
      | DateConstructor
      | ArrayConstructor;
    }
  >;
}
export class QueryOptionsHelper {
  sort: Record<string, 'desc' | 'asc'>;
  search: string;
  take: number;
  skip: number;
  filters: Record<string, unknown>;
  limit: number = 10;
  page: number = 1;

  constructor(
    partial: QueryOptionsDto,
    options: Options = {
      keepRawFilters: false,
      acceptFilterFields: []
    },
  ) {
    this.sort = partial.sort || {};
    this.take = partial.limit || 10;
    this.skip = partial.page > 0 ? (partial.page - 1) * this.take : 0;
    this.search = partial.search || '';
    this.filters = this.mapFindOptions(
      partial.filters,
      options.keepRawFilters,
      options.acceptFilterFields,
    );
    if (partial.page) this.page = partial.page;
    if (partial.limit) this.limit = partial.limit;
  }

  getPagination = ({ count, total }: { count: number; total: number }) => {
    // total mean length page
    // count mean length all record
    const totalPage = Math.ceil(count / this.take);
    const pageSize = this.limit;
    const currentPage = this.page;
    return { totalPage, total, pageSize, currentPage };
  };

  private mapFindOptions = (
    filters: QueryOptionsDto['filters'],
    keepRawFilters = false,
    acceptFields: Array<
      | string
      | {
        name: string;
        type?:
        | StringConstructor
        | NumberConstructor
        | BooleanConstructor
        | DateConstructor
        | ArrayConstructor;
      }
    > = [],
  ): Record<string, unknown> => {
    if (keepRawFilters) {
      return filters
    }

    const filterObject = {};
    // Normalize acceptFields to object format
    const fieldConfigs = acceptFields.map((field) =>
      typeof field === 'string' ? { name: field, type: String } : field,
    );

    for (const field in filters) {
      const filter = filters[field];
      const key = Object.keys(filter)?.[0] as keyof typeof filter;

      // Check if field is accepted
      const fieldConfig = fieldConfigs.find((config) => config.name === field);
      if (!fieldConfig) continue;

      // Convert the value to the appropriate type
      let value = filter[key];
      if (key !== QueryOperator.IN && key !== QueryOperator.NOT_IN) {
        switch (fieldConfig.type) {
          case Number:
            if (isNaN(value as number)) continue;
            value = Number(value);
            break;
          case Boolean:
            value = value === 'true' || value === true;
            break;
          case Date:
            if (isNaN((value as Date).getTime())) continue;
            value = new Date(value as string);
            break;
          case String:
            value = String(value);
            break;

          default:
            break;
        }
      } else {
        if (!Array.isArray(value)) {
          value = [value];
        }
        value = value.map((v: string | number) => v);
      }

      switch (key) {
        case QueryOperator.EQUAL:
          filterObject[field] = value;
          break;
        case QueryOperator.NOT_EQUAL:
          filterObject[field] = { $ne: value };
          break;
        case QueryOperator.GREATER_THAN:
          filterObject[field] = { $gt: value };
          break;
        case QueryOperator.GREATER_THAN_OR_EQUAL:
          filterObject[field] = { $gte: value };
          break;
        case QueryOperator.LESS_THAN:
          filterObject[field] = { $lt: value };
          break;
        case QueryOperator.LESS_THAN_OR_EQUAL:
          filterObject[field] = { $lte: value };
          break;
        case QueryOperator.IN:
          filterObject[field] = { In: value };
          break;
        case QueryOperator.NOT_IN:
          filterObject[field] = { $nin: value };
          break;

        default:
          break;
      }
    }
    return filterObject;
  };
}

export const QueryOptions = createParamDecorator(
  async (
    _options: Options = { acceptFilterFields: [] },
    ctx: ExecutionContext,
  ) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const rawQuery = req.query;
    const page = parseInt(rawQuery.page as string) || 1;
    const limit = parseInt(rawQuery.limit as string) || 20;
    const search = (rawQuery.search as string) || '';

    // Parse sort parameters (sort[field] = 'desc'|'asc')
    const sort: Record<string, 'desc' | 'asc'> = {};
    Object.keys(rawQuery).forEach((key) => {
      const sortMatch = key.match(/^sort\[(.+)\]$/);
      if (sortMatch) {
        const field = sortMatch[1];
        const value = rawQuery[key] as string;
        if (value === 'desc' || value === 'asc') {
          sort[field] = value;
        }
      }
    });

    // Parse filter parameters (filters[field][operator] = value)
    const filters: Record<string, Record<string, unknown>> = {};
    Object.keys(rawQuery).forEach((key) => {
      const filterMatch = key.match(/^filters\[(.+)\]\[(.+)\]$/);
      if (filterMatch) {
        const field = filterMatch[1];
        const operator = filterMatch[2];
        const value = rawQuery[key];
        if (!filters[field]) {
          filters[field] = {};
        }
        filters[field][operator] = value;
      }
    });
    const queryOptionsDto: QueryOptionsDto = {
      page,
      limit,
      search,
      sort,
      filters: filters as Record<string, Filter>,
    };
    return queryOptionsDto;
  },
);
