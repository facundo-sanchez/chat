import { Table, Column, Model, DataType, HasMany, BelongsToMany, Unique } from 'sequelize-typescript';
import { FeaturedMessages } from './featuredMessage.model';
import { Messages } from './message.model';
import { Role } from './role.model';
import { UserAccess } from './userAccess.model';

/**
 *
 * id,name,surname,active,phone,email, password_id
 */

@Table({ tableName: 'users', timestamps: true })
export class Users extends Model<Users> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  surname: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: number;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  active: boolean;

  // un usuario tiene muchas password
  @HasMany(() => UserAccess)
  passwordHistory: UserAccess[];

  // un usuario tiene muchos mensajes destacados
  @HasMany(() => FeaturedMessages)
  featuredMessages: FeaturedMessages[];

  @HasMany(() => Messages)
  messages: Messages[];

  @BelongsToMany(() => Role, 'user_roles', 'userId', 'roleId')
  roles: Role[];

  // un usuario tiene muchos mensajes
  // @BelongsToMany(() => Messages, {
  //   through: {
  //     model: () => UserMessages,
  //     unique: false,
  //   },
  //   foreignKey: 'user_id',
  //   otherKey: 'message_id',
  // })
  // messages: Messages[];

  // @BelongsToMany(() => Messages, ()=>Messages, 'user_id','id')
  // messages:Messages[]
}
