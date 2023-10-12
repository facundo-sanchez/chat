import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'messages_types', timestamps: true })
export class MessageTypes extends Model<MessageTypes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  name: string;
}
