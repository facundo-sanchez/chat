import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Messages } from './message.model';
import { Users } from './user.model';

@Table({ tableName: 'featured_messages', timestamps: true })
export class FeaturedMessages extends Model<FeaturedMessages> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Messages)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  messageId: number;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  // un usuario tiene muchos mensajes destacados
  @BelongsTo(() => Users)
  user: Users;

  //un featured message pertenece a un message
  @BelongsTo(() => Messages)
  message: Messages;
}
