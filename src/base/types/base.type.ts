import { ApiProperty } from '@nestjs/swagger';

export class ResponsePagination {
  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  currentPage: number;
}

export class ResponseController<T> {
  @ApiProperty()
  data: T;

  // @ApiPropertyOptional({ type: ResponsePagination })
  // pagination?: ResponsePagination;
}

export class ResponseApp<T> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty()
  data: T;
}

export class ResponseAppPagination<T> extends ResponseApp<T> {
  @ApiProperty({ type: ResponsePagination })
  pagination: ResponsePagination;
} 