import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '../dto/singup.dto';
import { UserEntity } from '../../globals/entities/user.entity';
import { Permission } from '../enums';
import { UserRepository } from 'src/globals/repository/user.repository';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'username',
      password: 'password',
      permissions: [Permission.CREATE_CAT, Permission.UPDATE_CAT]
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      permissions: [Permission.CREATE_CAT, Permission.UPDATE_CAT]
    },
  ];

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) { }

  async findOne(username: string): Promise<UserEntity> {
    let user = await this.userRepository.findOne({
      where: { email: username },
      relations: [ "owner" ],
    });
    if(user && !user.owner){
      user.owner = new UserEntity();
      user.owner.userId = user.userId
    }
    return user
  }

  create(signupDto: SignupDto): Promise<UserEntity> {
    return this.userRepository.createUser(signupDto);
  }
}