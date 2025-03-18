import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [AuthModule],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule{}