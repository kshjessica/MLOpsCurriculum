import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockUser = [
  {
    id: 1,
    name: 'user1',
    age: 20,
  },
  {
    id: 2,
    name: 'user2',
    age: 22,
  },
  {
    id: 3,
    name: 'user3',
    age: 24,
  },
];

const mockUserService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /user', () => {
    it('should return all users', async () => {
      jest.spyOn(mockUserService, 'findAll').mockImplementation(() => mockUser);
      const response = await controller.findAll();
      expect(response).toEqual(mockUser);
    });
  });

  describe('GET /user/:id', () => {
    it('should return a user with the requested id', async () => {
      jest
        .spyOn(mockUserService, 'findOne')
        .mockImplementation(() => mockUser[0]);
      const response = await controller.findOne(0);
      expect(response).toEqual(mockUser[0]);
    });
    it('should return error if requested id is not found', async () => {
      jest
        .spyOn(mockUserService, 'findOne')
        .mockRejectedValue(new BadRequestException('User not found'));
      expect(controller.findOne(4)).rejects.toThrow(BadRequestException);
    });
    it('should return error if requested id is not integer', async () => {
      jest
        .spyOn(mockUserService, 'findOne')
        .mockRejectedValue(
          new BadRequestException('Requested id must be an integer'),
        );
      expect(controller.findOne(parseInt('user1'))).rejects.toThrow(
        BadRequestException,
      );
    });
  });
  // describe('POST /user', () => {});
  // describe('PUT /user/:id', () => {});
  // describe('DELETE /user/:id', () => {});
});
