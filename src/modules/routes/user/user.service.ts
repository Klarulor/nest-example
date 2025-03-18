import { Injectable } from '@nestjs/common';
import { GetUserResponseDTO } from './dto/get.user.response.dto';
import { User } from '../../../entities/User';
import { CreateUserRequestDTO } from './dto/create.user.request.dto';
import { CreateUserResponseDTO } from './dto/create.user.response.dto';
import { AuthService } from '../auth/auth.service';
import { UpdateUserRequestDTO } from './dto/update.user.request.dto';

@Injectable()
export class UserService{
  constructor(private authService: AuthService) {
  }

  public getAll(): Promise<GetUserResponseDTO[]>{
    return User.find().then(x => x.map(GetUserResponseDTO.generate));
  }

  public async create(dto: CreateUserRequestDTO): Promise<CreateUserResponseDTO>{
    const data = await this.authService.tryRegister(dto);
    return {id: data.user.id};
  }

  public async update(userId: number, dto: UpdateUserRequestDTO): Promise<void>{
    const target = await User.findOneBy({id: userId});
    if(!target) throw "User not found";
    if(dto.username)
      target.username = dto.username;
    if(dto.email)
      target.email = dto.email;
    if(dto.rawPassword)
      await this.authService.changePassword(target, dto.rawPassword);

    await target.save();
  }

  public async delete(userId: number): Promise<void>{
    const target = await User.findOneBy({id: userId});
    if(!target) throw "User not found";
    await target.remove();
  }
}