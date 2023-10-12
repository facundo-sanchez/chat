/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Op } from 'sequelize'
// import { Sequelize } from 'sequelize';
import { Users, UserAccess, UserRole, Role } from 'src/models';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt'
import { sequelize } from 'src/config/database';
import { JwtService } from '@nestjs/jwt'
import { USER_ROLES } from 'src/constants/roles';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly usersModel: typeof Users,
    @Inject('USERS_ACCESS_REPOSITORY') private readonly accessModel: typeof UserAccess,
    @Inject('ROLE_REPOSITORY') private readonly roleModel: typeof Role,
    @Inject('USERS_ROLE_REPOSITORY') private readonly userRoleModel: typeof UserRole,
    private jwtService: JwtService
  ) { }

  async login(user: LoginDto): Promise<any> {
    try {
      const { email, password } = user
      const userResult = await this.usersModel.findOne({
        where: { email }, include: [{
          model: this.accessModel,
          where: {
            active: true
          }
        },
        {
          model: Role,
          through: { attributes: [] }
        }],
      })


      if (!userResult)
        return new HttpException("USER NOT FOUND", HttpStatus.NOT_FOUND);

      const { password: passwordAccess } = userResult.passwordHistory[0]

      if (!passwordAccess)
        return new HttpException("USER NOT FOUND", HttpStatus.NOT_FOUND);

      const checkPassword = await compare(password, passwordAccess)

      if (!checkPassword)
        return new HttpException("USER NOT FOUND", HttpStatus.NOT_FOUND);

      const payload = { id: userResult.id, name: userResult.name, surname: userResult.surname, email: userResult.email }
      const token = await this.jwtService.sign(payload);

      delete userResult.dataValues.passwordHistory

      return {
        user: userResult.dataValues, token, options: {
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          httpOnly: true,
          signed: true,
          secure: false,
        }
      };
    } catch (error) {
      throw new Error("");
    }
  }

  async register(user: RegisterDto): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      const { password, email, phone } = user;

      const validate = await this.usersModel.findAll({
        where: {
          [Op.or]: [
            { email },
            { phone }
          ]
        }
      })

      if (validate.length > 0)
        return new HttpException("EMAIL OR PHONE IS ALREADY IN USE", HttpStatus.CONFLICT);

      const passwordHash = await hash(password, 10);

      const result = new this.usersModel(user);
      await result.save({ transaction });

      const userRole = new this.userRoleModel(
        {
          userId: result.id,
          roleId: USER_ROLES.USER
        }
      )

      await userRole.save({ transaction })

      const userAccess = new this.accessModel({
        userId: result.id,
        password: passwordHash,
        active: true
      })
      await userAccess.save({ transaction });
      await transaction.commit();

      return result;
    } catch (error) {
      await transaction.rollback();
      throw new Error("");
    }
  }

  validate(token: string): any {
    try {
      const result = this.jwtService.verify(token)

      if (!result)
        return false;

      return result;
    } catch (error) {
      return false;
    }
  }
}
