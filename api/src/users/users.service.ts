import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserParams } from './users.inference';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: UserParams) {
    return this.usersRepository.create(user);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: string, user: UserParams) {
    return this.usersRepository.update(id, user);
  }

  async delete(id: string) {
    return this.usersRepository.delete(id);
  }
}
