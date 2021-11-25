import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './auth-credits-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body() authCreditsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCreditsDto);
  }

  @Post('/signIn')
  signIn(
    @Body() authCreditsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCreditsDto);
  }
}
