import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateRatingResponseDTO{
  @ApiProperty()
  @IsNumber()
  public id: number;
}