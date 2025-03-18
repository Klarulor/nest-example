import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Validate } from 'class-validator';
import { InlineValidator } from '../../../../middleware/validators/InlineValidator';
import { trimToEnglish } from '../../../../bin/utils/stringUtils';

export class CreateUserRequestDTO{
  @ApiProperty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @Validate(InlineValidator, ([(x: string) => trimToEnglish(x) == x]))
  public username: string;

  @ApiProperty()
  @IsString()
  public rawPassword: string;
}