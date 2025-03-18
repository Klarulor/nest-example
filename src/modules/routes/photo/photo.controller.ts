import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetPhotoResponseDTO } from './dto/get.photo.response.dto';
import { BlankDTO } from '../../../bin/dto/blank-dto';
import { UpdatePhotoRequestDTO } from './dto/update.photo.request.dto';
import { CreatePhotoResponseDTO } from './dto/create.photo.response.dto';
import { CreatePhotoRequestDTO } from './dto/create.photo.request.dto';
import { AuthGuard } from '../../../middleware/guards/AuthGuard';
import { IUserRequest } from '../../../bin/interfaces/IUserRequest';

@Controller('photo')
export class PhotoController{
  constructor(private photoService: PhotoService) {
  }

  @ApiOkResponse({type: GetPhotoResponseDTO, isArray: true})
  @Get()
  @UseGuards(AuthGuard)
  public getAll(): Promise<GetPhotoResponseDTO[]>{
    return this.photoService.getAll();
  }

  @ApiOkResponse({type: CreatePhotoResponseDTO})
  @Post()
  @UseGuards(AuthGuard)
  public create(@Body() dto: CreatePhotoRequestDTO, @Req() req: IUserRequest): Promise<CreatePhotoResponseDTO>{
    return this.photoService.create(dto, req.user);
  }

  @ApiOkResponse({type: BlankDTO})
  @Put(":id")
  @UseGuards(AuthGuard)
  public update(@Param() id: number, @Body() dto: UpdatePhotoRequestDTO, @Req() req: IUserRequest): Promise<void>{
    return this.photoService.update(id, dto, req.user);
  }

  @ApiOkResponse({type: BlankDTO})
  @Delete(":id")
  @UseGuards(AuthGuard)
  public delete(@Param() id: number, @Req() req: IUserRequest): Promise<void>{
    return this.photoService.delete(id, req.user);
  }
}