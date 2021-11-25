import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './auth-credits-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCreditsDto: AuthCredentialsDto): Promise<void> {
    const { userName, password } = authCreditsDto;

    //hash password
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    console.log('salt', salt);
    console.log('hashedPass', hashedPass);

    const user = this.create({ userName, password: hashedPass });

    try {
      await this.save(user);
    } catch (err) {
      console.log(err.code);

      if (err.code === '23505') {
        //duplicate user
        throw new ConflictException('Same user exists in DB');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
