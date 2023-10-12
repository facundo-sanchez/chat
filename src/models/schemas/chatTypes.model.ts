import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { Chats } from './chat.model';
// import { Chat } from './chat.model';

@Table({ tableName: 'chat_types', timestamps: true })
export class ChatTypes extends Model<ChatTypes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
  })
  name: string;

  @HasOne(() => Chats)
  chat: Chats; // Un ChatType tiene un Chat (relación 1:1)
}
