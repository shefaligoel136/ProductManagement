import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiPropertyOptional,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SearchProductQuery {
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value.replace(/'/g, '"'))
  where?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types
export function ApiFilterQuery(fieldName: string, filterDto: Function) {
  return applyDecorators(
    ApiExtraModels(filterDto),
    ApiQuery({
      required: false,
      name: fieldName,
      style: 'deepObject',
      explode: true,
      type: 'object',
      schema: {
        $ref: getSchemaPath(filterDto),
      },
    }),
  );
}
