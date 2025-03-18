import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Photo } from '../../../../entities/Photo';

export class GetPhotoResponseDTO{
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsString()
  public imageUrl?: string;

  public static create(photo: Photo): GetPhotoResponseDTO{
    return {
      id: photo.id,
      imageUrl: photo.imageUrl
    };
  }
}