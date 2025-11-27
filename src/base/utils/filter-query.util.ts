import {
  Equal, FindOptionsWhere, In, LessThan, LessThanOrEqual, MoreThan,
  MoreThanOrEqual, Not
} from "typeorm";
import { QueryOperator } from "../enums";
export function parseFilterQuery<T>(filtersQuery: Record<string, unknown>): FindOptionsWhere<T> {
  const whereOptions: FindOptionsWhere<T> = {};
  const filters = filtersQuery as Record<string, Record<QueryOperator, any>>;

  Object.entries(filters).forEach(([field, operators]) => {
    Object.entries(operators).forEach(([operator, value]) => {
      switch (operator as QueryOperator) {
        case QueryOperator.EQUAL:
          whereOptions[field] = Equal(value);
          break;

        case QueryOperator.NOT_EQUAL:
          whereOptions[field] = Not(Equal(value));
          break;

        case QueryOperator.GREATER_THAN:
          whereOptions[field] = MoreThan(value);
          break;

        case QueryOperator.GREATER_THAN_OR_EQUAL:
          whereOptions[field] = MoreThanOrEqual(value);
          break;

        case QueryOperator.LESS_THAN:
          whereOptions[field] = LessThan(value);
          break;

        case QueryOperator.LESS_THAN_OR_EQUAL:
          whereOptions[field] = LessThanOrEqual(value);
          break;

        case QueryOperator.IN:
          whereOptions[field] = In(Array.isArray(value) ? value : [value]);
          break;

        case QueryOperator.NOT_IN:
          whereOptions[field] = Not(In(Array.isArray(value) ? value : [value]));
          break;

        default:
          whereOptions[field] = Equal(value);
          break;
      }
    });
  });

  return whereOptions;
}


