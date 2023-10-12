import { Sequelize } from 'sequelize-typescript';
import { Models } from 'src/models';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '45.152.44.204',
  port: 3306,
  username: 'u619253451_facusanchez',
  password: '41789554Az',
  database: 'u619253451_facusanchez',
  define: {
    engine: 'InnoDB',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
  },
});

export const database = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      sequelize.addModels([...Models]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

export { sequelize };
