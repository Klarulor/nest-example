import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { getConfig } from './config/envConfig';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerUtilModule } from './modules/utils/swagger/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true,forbidUnknownValues: true  }));
  SwaggerUtilModule.setup(app);
  await app.listen(process.env.PORT ?? 3000);
}

getConfig();
bootstrap();
