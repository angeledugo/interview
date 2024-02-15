
import { Type, plainToInstance } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { Order } from "../constants";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

export class PageOptionsDto {
  
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  @Type(() => String)
  @IsOptional()
  readonly q?: string;

  @Type(() => String)
  @IsOptional()
  readonly type?: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}


@Injectable()
export class PaginationTransformPipe implements PipeTransform {
    async transform(dto: PageOptionsDto, {metatype}: ArgumentMetadata) {       
        if(!metatype)
        {
            return dto;
        }
        return plainToInstance(metatype, dto);
    }
}