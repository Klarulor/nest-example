import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Min } from 'class-validator';

export class UpdateLandmarkRequestDTO{
  @ApiProperty({nullable: true})
  @IsString()
  public name: string;

  @ApiProperty({nullable: true})
  @IsString()
  public description: string;

  @ApiProperty({nullable: true})
  @IsString()
  public geo: string;

  @ApiProperty({nullable: true})
  @IsNumber() @Min(0)
  public country_id: number;

  @ApiProperty({nullable: true})
  @IsArray()
  public photo_ids?: number[];

  @ApiProperty({nullable: true})
  @IsArray()
  public ratings_ids?: number[];
}