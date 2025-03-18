import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePhotoRequestDTO{
  @ApiProperty()
  @IsString()
  public imageUrl?: string;
}