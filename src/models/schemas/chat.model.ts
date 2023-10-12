// import { Model,Tabl } from "sequelize";
// import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ChatMembers } from './chatMembers.model';
import { ChatTypes } from './chatTypes.model';
import { Messages } from './message.model';

@Table({ tableName: 'chats', timestamps: true })
export class Chats extends Model<Chats> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => ChatTypes)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'chat_type_id',
  })
  chatTypeId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsTo(() => ChatTypes)
  chatType: ChatTypes; // Un ChatType tiene un Chat (relación 1:1)

  // @BelongsToMany(() => Messages, {
  //   through: {
  //     model: () => ChatMessages,
  //     unique: false,
  //   },
  //   foreignKey: 'chat_id',
  //   otherKey: 'message_id',
  // })
  // messages: Messages[];

  @HasMany(() => Messages)
  messages: Messages[];

  // un chat puede tener muchos miembros
  @HasMany(() => ChatMembers)
  chatMembers: ChatMembers[];
}
