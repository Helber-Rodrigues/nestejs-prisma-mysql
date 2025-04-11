import { PrismaService } from "../prisma/prisma.service";

export const userRepositoryMock = {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              exists: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              findFirst: jest.fn(),
            },
          },
        }