import { BadRequestException, Injectable } from '@nestjs/common';
import { GetLandmarkResponseDTO } from './dto/get.landmark.response.dto';
import { Landmark } from '../../../entities/Landmark';
import { CreateLandmarkRequestDTO } from './dto/create.landmark.request.dto';
import { CreateLandmarkResponseDTO } from './dto/create.landmark.response.dto';
import { Country } from '../../../entities/Country';
import { Photo } from '../../../entities/Photo';
import { Rating } from '../../../entities/Rating';
import { UpdateLandmarkRequestDTO } from './dto/update.landmark.request.dto';
import { PhotoService } from '../photo/photo.service';

@Injectable()
export class LandmarkService{
  public async getAll(): Promise<GetLandmarkResponseDTO[]>{
    return Promise.all((await Landmark.find()).map(GetLandmarkResponseDTO.create));
  }

  public async create(dto: CreateLandmarkRequestDTO): Promise<CreateLandmarkResponseDTO>{
    const country = await Country.findOneBy({id: dto.country_id});
    if(!country) throw "No country found";
    const landmark = new Landmark();
    landmark.country = country;
    landmark.name = dto.name;
    landmark.description = dto.description;
    landmark.geo = dto.geo;

    let targetPhotos: Photo[] = [];
    let targetRating: Rating[] = [];

    if(dto.photo_ids){
      for(const id of dto.photo_ids){
        const photo = await Photo.findOneBy({id});
        if(!photo) throw `No photo found with ${id} id`;
        targetPhotos.push(photo);
      }
    }
    if(dto.ratings_ids){
      for(const id of dto.ratings_ids){
        const rating = await Rating.findOneBy({id});
        if(!rating) throw `No rating found with ${id} id`;
        targetRating.push(rating);
      }
    }
    await landmark.save();
    for(const x of [...targetPhotos, ...targetRating])
    {
      x.landmark = landmark;
      await x.save();
    }

    return {id: landmark.id};
  }

  public async update(id: number, dto: UpdateLandmarkRequestDTO): Promise<void>{
    const target = await Landmark.findOneBy({id});
    if(!target) throw `No landmark found with ${id} id`;
    if(dto.name)
      target.name = dto.name;
    if(dto.description)
      target.description = dto.description;
    if(dto.geo)
      target.geo = dto.geo;
    if(dto.country_id){
      const country = await Country.findOneBy({id: dto.country_id})
      if(!country) throw `No country found with ${dto.country_id} id`;
      target.country = country;
    }
    let targetPhotos: Photo[] = [];
    let targetRating: Rating[] = [];

    if(dto.photo_ids){
      for(const x of await target.photos)
      {
        x.landmark = undefined;
        await x.save();
      }
      for(const id of dto.photo_ids){
        const photo = await Photo.findOneBy({id});
        if(!photo) throw `No photo found with ${id} id`;
        targetPhotos.push(photo);
      }
    }
    if(dto.ratings_ids){
      for(const x of await target.ratings)
      {
        x.landmark = undefined;
        await x.save();
      }
      for(const id of dto.ratings_ids){
        const rating = await Rating.findOneBy({id});
        if(!rating) throw `No rating found with ${id} id`;
        targetRating.push(rating);
      }
    }
    await target.save();
    for(const x of [...targetPhotos, ...targetRating])
    {
      x.landmark = target;
      await x.save();
    }
  }
  public async delete(id: number): Promise<void>{
    const target = await Landmark.findOneBy({id});
    if(!target) throw `No landmark found with ${id} id`;
    await target.remove();
  }

  public async getFilteredLandmarks(min: number, max: number): Promise<GetLandmarkResponseDTO[]>{
    if(!Number(min) || !Number(max)) throw new BadRequestException();
    return Promise.all((await Landmark.find()).filter(async x => {
      let average: number=0;
      const ratings = await x.ratings;
      for(const z of ratings)
        average += z.rating;
      average /= ratings.length;
      return average >= min && average <= max;
    }).map(GetLandmarkResponseDTO.create));
  }

  public async getCountryFilteredLandmarks(country_id: number): Promise<GetLandmarkResponseDTO[]>{
    return Promise.all((await Landmark.find()).filter(x => x.country.id == country_id).map(GetLandmarkResponseDTO.create));
  }
}