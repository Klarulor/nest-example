import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Country } from '../Country';

export class SimpleCountry{
  @ApiProperty()
  @IsString()
  public id: number;

  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty({nullable: true})
  @IsString()
  public imageUrl?: string;

  public static create(country: Country){
    const instance = new SimpleCountry();
    instance.id = country.id;
    instance.name = country.name;
    instance.imageUrl = country.imageUrl;
    return instance;
  }
}