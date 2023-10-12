import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { ChatMembers } from './chatMembers.model';

@Table({ tableName: 'chat_roles', timestamps: true })
export class ChatRoles extends Model<ChatRoles> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  name: string;

  @HasOne(() => ChatMembers)
  chatMember: ChatMembers;
}
