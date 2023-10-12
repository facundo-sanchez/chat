import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Chats } from './chat.model';
import { Messages } from './message.model';

@Table({ tableName: 'chat_messages', timestamps: false })
export class ChatMessages extends Model<ChatMessages> {
  @ForeignKey(() => Chats)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'chat_id',
  })
  chatId: number;

  @ForeignKey(() => Messages)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'message_id',
  })
  messageId: number;
}
