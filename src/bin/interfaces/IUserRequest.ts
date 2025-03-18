import {Request} from '@nestjs/common';
import { User } from '../../entities/User';

export interface IUserRequest extends Request{
    user: User
}