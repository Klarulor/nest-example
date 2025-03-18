import { Body, Injectable, Param } from '@nestjs/common';
import { GetPhotoResponseDTO } from './dto/get.photo.response.dto';
import { Photo } from '../../../entities/Photo';
import { UpdatePhotoRequestDTO } from './dto/update.photo.request.dto';
import { CreatePhotoRequestDTO } from './dto/create.photo.request.dto';
import { CreatePhotoResponseDTO } from './dto/create.photo.response.dto';
import { User } from '../../../entities/User';

@Injectable()
export class PhotoService{
  public getAll(): Promise<GetPhotoResponseDTO[]>{
    return Photo.find().then(x => x.map(z => ({
      id: z.id,
      imageUrl: z.imageUrl
    })));
  }

  public async create(@Body() dto: CreatePhotoRequestDTO, creator: User): Promise<CreatePhotoResponseDTO>{
    const photo = new Photo();
    photo.imageUrl = dto.imageUrl;
    photo.creator = creator;
    await photo.save();
    return {id: photo.id};
  }

  public async update(id: number, dto: UpdatePhotoRequestDTO, user: User): Promise<void>{
    const target = await Photo.findOneBy({id});
    if(!target) throw `No photo found with ${id} id`;
    if(target.creator?.id != user.id) throw `You have no access to this rating`;
    target.imageUrl = dto.imageUrl;
    await target.save();
  }

  public async delete(id: number, user: User): Promise<void>{
    const target = await Photo.findOneBy({id});
    if(!target) throw `No photo found with ${id} id`;
    if(target.creator?.id != user.id) throw `You have no access to this rating`;
    await target.remove();
  }
}