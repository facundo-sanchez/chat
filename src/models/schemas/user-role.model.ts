import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Role } from './role.model';
import { Users } from './user.model';

@Table({ tableName: 'user_roles', timestamps: false })
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => Users)
  @Column({
    allowNull: false,
    field: 'user_id',
    primaryKey: true
  })
  userId: number;

  @ForeignKey(() => Role)
  @Column({
    allowNull: false,
    field: 'role_id',
    primaryKey: true
  })
  roleId: number;
}