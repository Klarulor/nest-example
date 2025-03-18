import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDTO } from './dto/login.request.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../entities/User';
import {hash, verify} from "argon2";
import { LoginResponseDTO } from './dto/login.response.dto';
import { RegisterResponseDTO } from './dto/register.response.dto';
import { RegisterRequestDTO } from './dto/register.request.dto';
import { UsersService } from '../../utils/entityServices/users.service';
import { getConfig } from '../../../config/envConfig';

@Injectable()
export class AuthService{
  constructor(private jwtService: JwtService,
              private usersService: UsersService) {}

  public async login(username: string, password: string): Promise<LoginResponseDTO>{
    const target = await User.findOneBy({username});
    if(!target || !await verify(target?.passwordHash, password)) throw new BadRequestException("Bad creditals");
    return {
      access_token: await this.createAccessToken(target)
    };
  }

  public register(dto: RegisterRequestDTO): Promise<RegisterResponseDTO>{
    return this.tryRegister(dto).then(x => x.dto);
  }

  public async tryRegister(dto: RegisterRequestDTO): Promise<{dto: RegisterResponseDTO, user: User}>{
    const alreadyIncludes = await this.usersService.hasLoginOrEmail(dto.username, dto.email);
    if(alreadyIncludes) throw new BadRequestException("User is already registered");
    const user = new User();
    user.username = dto.username;
    user.passwordHash = await hash(dto.rawPassword);
    user.email = dto.email;
    await user.save();
    return {
      dto: {access_token: await this.createAccessToken(user)},
      user
    };
  }

  public async authorize(token: string): Promise<User | null>{
    return new Promise(r => {
      this.jwtService.verifyAsync(token, {secret: getConfig().JWT_SECRET})
        .then(x => User.findOneBy({id: (x as IJWTBody).id}).then(r))
        .catch(() => r(null));
    })
  }

  private async createAccessToken(user: User): Promise<string>{
    const payload: IJWTBody = {id: user.id};
    return await this.jwtService.signAsync(payload);
  }

  public async changePassword(user: User, newRawPassword: string): Promise<void>{
    user.passwordHash = await hash(newRawPassword);
    await user.save();
  }
}

export interface IJWTBody{
  id: number;
}