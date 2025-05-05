import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../enum/role.enum';
import { User } from '@prisma/client';

const UserEntityList = [
  {
    name: 'Joao Rangel',
    email: 'joao@hcode.com.br',
    birthAt: new Date('2000-01-01'),
    password: '123456',
    role: 1,
  },
];

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('Validar a definição', () => {
    expect(userService).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      const data: CreateUserDto = {
        birthAt: '2000-01-01',
        email: 'joao@hcode.com.br',
        name: 'Joao Rangel',
        password: '123456',
        role: Role.Admin,
        id: 6,
      };
      const result = await userService.create(data);

      expect(result).toEqual();
    });
  });
  describe('Read', () => {});
  describe('Update', () => {});
  describe('Delete', () => {});
});
