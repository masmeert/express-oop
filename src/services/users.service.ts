import { Prisma, PrismaClient, User } from "@prisma/client";

import { prisma } from "../common/utils/prisma";
import type { ServiceResponse } from "../common/types/core";

export default class UsersService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public async find_one(
    where: Prisma.UserWhereUniqueInput
  ): ServiceResponse<User> {
    try {
      const user = await this.prisma.user.findUnique({ where });
      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }
      return {
        success: true,
        message: "User found",
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error finding user",
      };
    }
  }

  public async create(data: Prisma.UserCreateInput): ServiceResponse<User> {
    try {
      const user = await this.prisma.user.create({ data });
      return {
        success: true,
        message: "User created",
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error creating user",
      };
    }
  }

  public async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  ): ServiceResponse<User> {
    try {
      const user = await this.prisma.user.update({ where, data });
      return {
        success: true,
        message: "User updated",
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error updating user",
      };
    }
  }

  public async delete(
    where: Prisma.UserWhereUniqueInput
  ): ServiceResponse<User> {
    try {
      await this.prisma.user.delete({ where });
      return {
        success: true,
        message: "User deleted",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error deleting user",
      };
    }
  }
}
