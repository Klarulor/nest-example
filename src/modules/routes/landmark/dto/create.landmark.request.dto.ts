import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Min } from 'class-validator';

export class CreateLandmarkRequestDTO{
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
  @IsNumber() @Min(0)
  public country_id: number;

  @ApiProperty({nullable: true})
  @IsArray()
  public photo_ids?: number[];

  @ApiProperty({nullable: true})
  @IsArray()
  public ratings_ids?: number[];
}