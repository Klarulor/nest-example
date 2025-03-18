import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetLandmarkResponseDTO } from './dto/get.landmark.response.dto';
import { LandmarkService } from './landmark.service';
import { BlankDTO } from '../../../bin/dto/blank-dto';
import { CreateLandmarkRequestDTO } from './dto/create.landmark.request.dto';
import { CreateLandmarkResponseDTO } from './dto/create.landmark.response.dto';
import { UpdateLandmarkRequestDTO } from './dto/update.landmark.request.dto';
import { AuthGuard } from '../../../middleware/guards/AuthGuard';

@Controller("landmark")
export class LandmarkController{
  constructor(private landmarkService: LandmarkService) {
  }

  @ApiOkResponse({type: GetLandmarkResponseDTO, isArray: true})
  @Get()
  public get(): Promise<GetLandmarkResponseDTO[]>{
    return this.landmarkService.getAll();
  }

  @ApiOkResponse({type: CreateLandmarkResponseDTO})
  @UseGuards(AuthGuard)
  @Post()
  public create(@Body() dto: CreateLandmarkRequestDTO): Promise<CreateLandmarkResponseDTO>{
    return this.landmarkService.create(dto);
  }

  @ApiOkResponse({type: BlankDTO})
  @UseGuards(AuthGuard)
  @Put(":id")
  public update(@Param() id: number, @Body() dto: UpdateLandmarkRequestDTO): Promise<void>{
    return this.landmarkService.update(id, dto);
  }

  @ApiOkResponse({type: BlankDTO})
  @UseGuards(AuthGuard)
  @Delete(":id")
  public delete(@Param() id: number, @Body() dto: UpdateLandmarkRequestDTO): Promise<void>{
    return this.landmarkService.delete(id);
  }

  @ApiOkResponse({type: GetLandmarkResponseDTO, isArray: true})
  @UseGuards(AuthGuard)
  @Get("/filter/rating")
  async getFilteredLandmarks(@Query('min') min: number, @Query('max') max: number,): Promise<GetLandmarkResponseDTO[]> {
    return this.landmarkService.getFilteredLandmarks(min, max);
  }

  @ApiOkResponse({type: GetLandmarkResponseDTO, isArray: true})
  @UseGuards(AuthGuard)
  @Get("/filter/country")
  async getCountryFilteredLandmarks(@Query('country_id') id: number,): Promise<GetLandmarkResponseDTO[]> {
    return this.landmarkService.getCountryFilteredLandmarks(id);
  }
}