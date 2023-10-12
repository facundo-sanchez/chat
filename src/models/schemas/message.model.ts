import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chats } from './chat.model';
import { MessageTypes } from './messageTypes.model';
import { Users } from './user.model';

@Table({ tableName: 'messages', timestamps: true })
export class Messages extends Model<Messages> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Chats)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'chat_id',
  })
  chatId: number;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',
  })
  userId: number;

  @ForeignKey(() => MessageTypes)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'message_type_id',
  })
  messageTypeId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message: string;

  @BelongsTo(() => MessageTypes, 'message_type_id')
  messageType: MessageTypes;

  @BelongsTo(() => Users, 'user_id')
  user: Users;

  @BelongsTo(() => Chats, 'chat_id')
  chat: Chats;

  // @BelongsTo(() => UserMessages,'message_id')
  // userMessage:UserMessages
}
