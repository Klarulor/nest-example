import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerUtilModule } from './utils/swagger/swagger.module';
import { ConfigModule } from '@nestjs/config';
import { TypeormModule } from './utils/typeorm/typeorm.module';
import { AuthModule } from './routes/auth/auth.module';
import { UserModule } from './routes/user/user.module';
import { LandmarkModule } from './routes/landmark/landmark.module';
import { PhotoModule } from './routes/photo/photo.module';
import { RatingModule } from './routes/rating/rating.module';

@Module({
  imports: [SwaggerUtilModule, TypeormModule,
    AuthModule, UserModule, LandmarkModule, PhotoModule, RatingModule,
    ConfigModule.forRoot({envFilePath: ".env"})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
