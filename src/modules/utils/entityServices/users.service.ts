import { Injectable } from '@nestjs/common';
import { User } from '../../../entities/User';

@Injectable()
export class UsersService{
  public async hasLoginOrEmail(username: string, email: string): Promise<boolean>{
    const users = await User.find();
    //console.log(users.filter(x => x.email === email || x.username === username))
    return users.filter(x => x.email === email || x.username === username).length>0;
  }



}