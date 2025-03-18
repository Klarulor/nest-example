import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Validate } from 'class-validator';
import { InlineValidator } from '../../../../middleware/validators/InlineValidator';
import { trimToEnglish } from '../../../../bin/utils/stringUtils';

export class UpdateUserRequestDTO{
  @ApiProperty({required: false})
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({required: false})
  @IsString()
  @Validate(InlineValidator, ([(x: string) => trimToEnglish(x) == x]))
  public username: string;

  @ApiProperty({required: false})
  @IsString()
  public rawPassword: string;
}