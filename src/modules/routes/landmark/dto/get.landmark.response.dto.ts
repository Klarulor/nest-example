import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Country } from '../../../../entities/Country';
import { SimpleCountry } from '../../../../entities/simplified/SimpleCountry';
import { Column } from 'typeorm';
import { Landmark } from '../../../../entities/Landmark';
import { GetPhotoResponseDTO } from '../../photo/dto/get.photo.response.dto';

export class GetLandmarkResponseDTO{
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsString()
  public description: string;

  @ApiProperty()
  @IsString()
  public geo: string;

  @ApiProperty()
  public country: SimpleCountry;

  @ApiProperty({nullable: true})
  @IsString()
  public imageUrl?: string;

  @ApiProperty()
  @IsArray()
  public photos: GetPhotoResponseDTO[];

  public static async create(landmark: Landmark): Promise<GetLandmarkResponseDTO>{
    const photos = (await landmark.photos).map(GetPhotoResponseDTO.create);
    return {
      id: landmark.id,
      name: landmark.name,
      description: landmark.description,
      geo: landmark.geo,
      country: SimpleCountry.create(landmark.country),
      imageUrl: landmark.imageUrl,
      photos: photos
    };
  }
}