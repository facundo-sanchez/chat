import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Users } from './user.model';
// import { RegisterDto } from 'src/modules/auth/dto/register-auth.dto';

/**
 *
 * id,name,surname,active,phone,email, password_id
 */

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model<Role> {
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

  // Definición de la relación Many-to-Many con Users
  @BelongsToMany(() => Users, 'user_roles', 'roleId', 'userId')
  users: Users[];

}
