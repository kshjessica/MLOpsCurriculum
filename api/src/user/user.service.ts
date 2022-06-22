import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserParams } from './inference/user.inference';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: UserParams) {
    return this.userRepository.create(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async update(id: string, user: UserParams) {
    return this.userRepository.update(id, user);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
