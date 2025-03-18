import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserResponseDTO{
  @ApiProperty()
  @IsNumber()
  public id: number;
}