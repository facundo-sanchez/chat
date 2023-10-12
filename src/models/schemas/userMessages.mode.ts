import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Users } from './user.model';
import { Messages } from './message.model';

@Table({
  tableName: 'user_messages',
  timestamps: false,
})
export class UserMessages extends Model<UserMessages> {
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',
  })
  userId: number;

  @ForeignKey(() => Messages)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'message_id',
  })
  messageId: number;
}
