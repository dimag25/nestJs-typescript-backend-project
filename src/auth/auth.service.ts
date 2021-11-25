import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './auth-credits-dto';
import { UserRepository } from './user.respository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCreditsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCreditsDto);
  }

  async signIn(
    authCreditsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { userName, password } = authCreditsDto;

    const user = await this.userRepository.findOne({ userName });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userName };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credits');
    }
  }
}
