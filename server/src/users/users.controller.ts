import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { OptionalAuth } from '../auth/decorators/optional-auth.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { User } from '../auth/decorators/user.decorator';
import { UserInterface } from '../common/interfaces/user.interface';
import { UsersService } from './users.service';

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
  @OptionalAuth()
  async getProfile(@Param('username') username: string, @User() user?: UserInterface) {
    if (user?.username !== username) {
      user = await this.usersService.findByUsername(username);
    }
    return { user };
  }
}
