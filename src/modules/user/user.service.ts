/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject } from '@nestjs/common';
import { sequelize } from 'src/config/database';
import { Users } from 'src/models';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly usersModel: typeof Users,
    @Inject('USERS_ACCESS_REPOSITORY') private readonly accessModel: typeof Users,
  ) { }

  async getUsers(): Promise<Users[]> {
    try {
      const users = await this.usersModel.findAll({ include: this.accessModel });
      return users;
    } catch (error) {
      throw new Error('Error al obtener usuarios');
    }
  }

  async getUser(id: number): Promise<Users> {
    try {
      const user = await this.usersModel.findByPk(id);
      return user;
    } catch (error) {
      throw new Error('Error al obtener usuarios');
    }
  }

  async createUser(user: UserDto): Promise<Users> {
    const transaction = await sequelize.transaction();
    try {
      const newUser = new this.usersModel(user);

      await newUser.save({ transaction });
      await transaction.commit();
      return newUser;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error al obtener usuarios');
    }
  }

  async updateUser(id: number, user: UserDto): Promise<UserDto> {
    const transaction = await sequelize.transaction();
    try {
      const result = await this.usersModel.update(user, {
        where: { id },
        transaction,
      });
      if (result[0]) {
        await transaction.commit();
        return user;
      }

      await transaction.rollback();
      return null;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error al consumir el servicio');
    }
  }

  async deleteUser(id: number): Promise<Users> {
    const transaction = await sequelize.transaction();
    try {
      const user = await this.usersModel.findByPk(id);
      if (user) {
        await user.destroy({ transaction });
        await transaction.commit();
        return user;
      }

      return null;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error al obtener usuarios');
    }
  }
}
