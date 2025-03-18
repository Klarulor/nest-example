import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePhotoResponseDTO{
  @ApiProperty()
  @IsNumber()
  public id: number;
}