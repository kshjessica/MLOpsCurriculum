import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  private users: User[] = [];
  private idSequence = 0;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    this.users.push({
      ...createUserDto,
      id: this.idSequence++,
    });

    return this.users.at(-1);
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const i = this.users.findIndex((user) => user.id == id);

    if (i === -1) return null;
    this.users[i] = {
      ...this.users[i],
      ...updateUserDto,
    };

    return this.users[i];
  }

  delete(id: number) {
    const i = this.users.findIndex((user) => user.id == id);

    if (i === -1) return null;
    const user = this.users[i];
    this.users.splice(i, 1);

    return user;
  }
}
