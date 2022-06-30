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
    it('should return the user with the requested id', async () => {
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
      expect(controller.findOne(5)).rejects.toThrow(BadRequestException);
    });
    it('should return error if requested id is not integer', async () => {
      jest
        .spyOn(mockUserService, 'findOne')
        .mockRejectedValue(
          new BadRequestException('Requested id must be an integer'),
        );
      expect(controller.findOne(parseInt('idNumberOne'))).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('POST /user', () => {
    const user4 = { name: 'user4', age: 26 };
    const createUser4 = { ...user4, id: 4 };

    it('should create a new user', async () => {
      jest.spyOn(mockUserService, 'create').mockResolvedValue(createUser4);
      expect(await controller.create(user4)).toEqual(createUser4);
    });
    it('should return error if name field is empty', async () => {
      jest
        .spyOn(mockUserService, 'create')
        .mockRejectedValue(new BadRequestException('Name is required'));
      expect(controller.create({ ...user4, name: null })).rejects.toThrow(
        BadRequestException,
      );
    });
    it('should return error if age field is empty', async () => {
      jest
        .spyOn(mockUserService, 'create')
        .mockRejectedValue(new BadRequestException('Age is required'));
      expect(controller.create({ ...user4, age: null })).rejects.toThrow(
        BadRequestException,
      );
    });
    it('should return error if requested age is not integer', async () => {
      jest
        .spyOn(mockUserService, 'create')
        .mockRejectedValue(new BadRequestException('Age must be an integer'));
      expect(controller.findOne(parseInt('userNumberFour'))).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('PUT /user/:id', () => {
    const updateUser1 = { ...mockUser[0], age: 18 };

    it('should update the user with the requested id', async () => {
      jest.spyOn(mockUserService, 'update').mockResolvedValue(updateUser1);
      expect(await controller.update(0, mockUser[0])).toEqual(updateUser1);
    });
    it('should return error if requested id is not found', async () => {
      jest
        .spyOn(mockUserService, 'update')
        .mockRejectedValue(new BadRequestException('User not found'));
      expect(controller.update(5, mockUser[5])).rejects.toThrow(
        BadRequestException,
      );
    });
    it('should return error if requested id is not integer', async () => {
      jest
        .spyOn(mockUserService, 'update')
        .mockRejectedValue(
          new BadRequestException('Requested id must be an integer'),
        );
      expect(
        controller.update(parseInt('idNumberOne'), mockUser[0]),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('DELETE /user/:id', () => {
    it('should remove the user with the requested id', async () => {
      jest
        .spyOn(mockUserService, 'remove')
        .mockImplementation(() => mockUser[0]);
      const response = await controller.delete(0);
      expect(response).toEqual(mockUser[0]);
    });
    it('should return error if requested id is not found', async () => {
      jest
        .spyOn(mockUserService, 'remove')
        .mockRejectedValue(new BadRequestException('User not found'));
      expect(controller.delete(5)).rejects.toThrow(BadRequestException);
    });
    it('should return error if requested id is not integer', async () => {
      jest
        .spyOn(mockUserService, 'remove')
        .mockRejectedValue(
          new BadRequestException('Requested id must be an integer'),
        );
      expect(controller.delete(parseInt('idNumberOne'))).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
