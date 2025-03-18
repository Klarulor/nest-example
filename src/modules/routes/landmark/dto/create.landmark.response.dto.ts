import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateLandmarkResponseDTO{
  @ApiProperty()
  @IsNumber()
  public id: number;
}