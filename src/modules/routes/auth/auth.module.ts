import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getConfig } from '../../../config/envConfig';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../../utils/entityServices/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: getConfig().JWT_SECRET,
      signOptions: { expiresIn: getConfig().JWT_EXP },
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule{}