import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    signIn(@Request() req) {
        return this.authService.signIn(req.user);
    }

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
    }
    
}
