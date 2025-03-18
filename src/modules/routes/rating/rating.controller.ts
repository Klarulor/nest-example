import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetRatingResponseDTO } from './dto/get.rating.response.dto';
import { CreateRatingResponseDTO } from './dto/create.rating.response.dto';
import { CreateRatingRequestDTO } from './dto/create.rating.request.dto';
import { BlankDTO } from '../../../bin/dto/blank-dto';
import { UpdateRatingRequestDTO } from './dto/update.rating.request.dto';
import { AuthGuard } from '../../../middleware/guards/AuthGuard';
import { IUserRequest } from '../../../bin/interfaces/IUserRequest';

@Controller("rating")
export class RatingController{
  constructor(private ratingService: RatingService) {
  }

  @ApiOkResponse({type: GetRatingResponseDTO, isArray: true})
  @UseGuards(AuthGuard)
  @Get()
  public getAll(): Promise<GetRatingResponseDTO[]>{
    return this.ratingService.getAll();
  }

  @ApiOkResponse({type: CreateRatingResponseDTO})
  @UseGuards(AuthGuard)
  @Post()
  public create(@Body() dto: CreateRatingRequestDTO, @Req() req: IUserRequest): Promise<CreateRatingResponseDTO>{
    return this.ratingService.create(dto, req.user);
  }

  @ApiOkResponse({type: BlankDTO})
  @UseGuards(AuthGuard)
  @Put(":id")
  public update(@Param() id: number, @Body() dto: UpdateRatingRequestDTO): Promise<void>{
    return this.ratingService.update(id, dto);
  }

  @ApiOkResponse({type: BlankDTO})
  @UseGuards(AuthGuard)
  @Delete(":id")
  public delete(@Param() id: number): Promise<void>{
    return this.ratingService.delete(id);
  }
}