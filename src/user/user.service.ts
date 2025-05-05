import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    return this.prisma.user.create({
      data: {
        ...data,
        birthAt: data.birthAt ? new Date(data.birthAt) : null,
      },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    await this.exists(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDto,
  ) {
    await this.exists(id);

    if (password)
      password = await bcrypt.hash(password, await bcrypt.genSalt());

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role,
      },
    });
  }

  async updatePartial(
    id: number,
    { name, email, password, birthAt, role }: UpdatePatchUserDto,
  ) {
    await this.exists(id);
    const data: any = {};
    if (birthAt) data.birthAt = new Date(birthAt);
    if (name) data.name = name;
    if (email) data.email = email;
    if (password)
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    if (role) data.role = role;

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe!`);
    }
  }
}

function InjectRepositoy(
  UserEntity: any,
): (
  target: typeof UserService,
  propertyKey: undefined,
  parameterIndex: 0,
) => void {
  throw new Error('Function not implemented.');
}
