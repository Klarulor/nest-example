import { Body, Injectable } from '@nestjs/common';
import { Photo } from '../../../entities/Photo';
import { GetRatingResponseDTO } from './dto/get.rating.response.dto';
import { Rating } from '../../../entities/Rating';
import { CreateRatingRequestDTO } from './dto/create.rating.request.dto';
import { CreateRatingResponseDTO } from './dto/create.rating.response.dto';
import { UpdateRatingRequestDTO } from './dto/update.rating.request.dto';
import { User } from '../../../entities/User';

@Injectable()
export class RatingService{
  public async getAll(): Promise<GetRatingResponseDTO[]>{
    const ratings = await Rating.find();
    return ratings.map(GetRatingResponseDTO.create);
  }

  public async create(dto: CreateRatingRequestDTO, creator: User): Promise<CreateRatingResponseDTO>{
    const rating = new Rating();
    rating.rating = dto.rating;
    rating.creator = creator;
    await rating.save();
    return {
      id: rating.id
    };
  }

  public async update(id: number, dto: UpdateRatingRequestDTO): Promise<void>{
    const target = await Rating.findOneBy({id});
    if(!target) throw `No rating found with ${id} id`;
    target.rating = dto.rating;
    await target.save();
  }

  public async delete(id: number): Promise<void>{
    const target = await Rating.findOneBy({id});
    if(!target) throw `No rating found with ${id} id`;
    await target.remove();
  }
}