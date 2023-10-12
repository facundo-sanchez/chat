import {
  BelongsTo,
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Chats } from './chat.model';
import { ChatRoles } from './chatRoles.model';
import { Users } from './user.model';

@Table({ tableName: 'chat_members', timestamps: true })
export class ChatMembers extends Model<ChatMembers> {
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
  user_id: number;

  @ForeignKey(() => ChatRoles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'chat_role_id',
  })
  chatRoleId: number;

  @BelongsTo(() => ChatRoles)
  chatRole: ChatRoles; // Un ChatType tiene un groupRole (relación 1:1)

  // un miembro pertenece a un chat
  @BelongsTo(() => Chats)
  chat: Chats;
}
