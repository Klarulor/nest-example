import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class UpdateRatingRequestDTO{
  @ApiProperty()
  @IsNumber() @Min(1) @Max(5)
  public rating: number;
}