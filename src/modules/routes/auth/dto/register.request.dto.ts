import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { InlineValidator } from '../../../../middleware/validators/InlineValidator';
import { trimToEnglish } from '../../../../bin/utils/stringUtils';

export class RegisterRequestDTO{
  @ApiProperty() @IsNotEmpty() @IsDefined()
  @IsString() @Length(5, 30)
  @Validate(InlineValidator, ([(x: string) => trimToEnglish(x) == x]))
  public username: string;

  @ApiProperty() @IsNotEmpty() @IsDefined()
  @IsString() @Length(1, 50)
  @IsEmail()
  @Validate(InlineValidator, ([(x: string) => trimToEnglish(x, "@_-.") == x]))
  public email: string;

  @ApiProperty() @IsNotEmpty() @IsDefined()
  @IsString()
  public rawPassword: string;
}