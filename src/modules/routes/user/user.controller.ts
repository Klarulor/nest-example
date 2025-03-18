import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetUserResponseDTO } from './dto/get.user.response.dto';
import { UserService } from './user.service';
import { CreateUserResponseDTO } from './dto/create.user.response.dto';
import { CreateUserRequestDTO } from './dto/create.user.request.dto';
import { UpdateUserResponseDTO } from './dto/update.user.response.dto';
import { UpdateUserRequestDTO } from './dto/update.user.request.dto';
import { BlankDTO } from '../../../bin/dto/blank-dto';
import { AuthGuard } from '../../../middleware/guards/AuthGuard';

@Controller('user')
export class UserController{
  constructor(private userService: UserService){}

  @ApiOkResponse({type: GetUserResponseDTO, isArray: true})
  @UseGuards(AuthGuard)
  @Get()
  public get(): Promise<GetUserResponseDTO[]>{
    return this.userService.getAll();
  }

  @ApiOkResponse({type: CreateUserResponseDTO})
  @UseGuards(AuthGuard)
  @Post()
  public create(@Body() dto: CreateUserRequestDTO): Promise<CreateUserResponseDTO>{
    return this.userService.create(dto);
  }

  @ApiOkResponse({type: UpdateUserResponseDTO})
  @UseGuards(AuthGuard)
  @Put(":id")
  public update(@Param() id: number, @Body() dto: UpdateUserRequestDTO): Promise<void>{
    return this.userService.update(id, dto);
  }

  @ApiOkResponse({type: BlankDTO})
  @UseGuards(AuthGuard)
  @Delete(":id")
  public delete(@Param() id: number): Promise<void>{
    return this.userService.delete(id);
  }

}