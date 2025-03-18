import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from '../../../config/envConfig';
import { Landmark } from '../../../entities/Landmark';
import { Country } from '../../../entities/Country';
import { Photo } from '../../../entities/Photo';
import { User } from '../../../entities/User';
import { Rating } from '../../../entities/Rating';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: getConfig().DB_HOST,
      port: parseInt(getConfig().DB_PORT) || 3306,
      username: getConfig().DB_USER,
      password: getConfig().DB_PASSWORD,
      database: getConfig().DB_DATABASE,
      entities: [Landmark, Country, Photo, Rating, User],
      synchronize: true,
    }),
  ]
})
export class TypeormModule{}
