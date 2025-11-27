import { FindOptionsOrder } from "typeorm";

export function parseSortQuery<T>(sortOptions?: Record<string, string>): FindOptionsOrder<T> {
  const orderOptions: FindOptionsOrder<T> = {};

  Object.entries(sortOptions).forEach(([field, direction]) => {
    orderOptions[field] = direction.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  });

  return orderOptions;
}
