import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../auth/decorators/user.decorator';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth()
  @Roles('moderator', 'admin')
  async getAll() {
    const users = await this.usersService.findAll();
    return { users };
  }

  @Get('@me')
  @Auth()
  async getMyProfile(@User() user: UserInterface) {
    return { user };
  }

  @Get(':username')
  @Auth()
  async getProfile(@Param('username') username: string, @User() user?: UserInterface) {
    if (user?.username !== username) {
      user = await this.usersService.findByUsername(username);
    }
    return { user };
  }
}
