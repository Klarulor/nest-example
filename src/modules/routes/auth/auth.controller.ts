import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoginResponseDTO } from './dto/login.response.dto';
import { LoginRequestDTO } from './dto/login.request.dto';
import { RegisterRequestDTO } from './dto/register.request.dto';
import { RegisterResponseDTO } from './dto/register.response.dto';

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @ApiOkResponse({type: LoginResponseDTO})
  @Post('login')
  login(@Body() dto: LoginRequestDTO): Promise<LoginResponseDTO>{
    return this.authService.login(dto.username, dto.password);
  }

  @ApiOkResponse({type: RegisterRequestDTO})
  @Post('register')
  register(@Body() dto: RegisterRequestDTO): Promise<RegisterResponseDTO>{
    return this.authService.register(dto);
  }
}