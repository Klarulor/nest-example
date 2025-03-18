import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Rating } from '../../../../entities/Rating';

export class GetRatingResponseDTO{
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsNumber()
  public creator_id: number;

  @ApiProperty()
  @IsNumber()
  public rating: number;

  public static create(rating: Rating): GetRatingResponseDTO{
    const instance = new GetRatingResponseDTO();
    instance.id = rating.id;
    instance.creator_id = rating.creator?.id as number;
    instance.rating = rating.rating;
    return instance;
  }
}