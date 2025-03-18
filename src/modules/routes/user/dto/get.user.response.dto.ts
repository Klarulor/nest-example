import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { User } from '../../../../entities/User';

export class GetUserResponseDTO{
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsString()
  public username: string;

  @ApiProperty()
  @IsString()
  public email: string;

  public static generate(user: User): GetUserResponseDTO{
    return {
      id: user.id,
      username: user.username,
      email: user.email
    };
  }
}