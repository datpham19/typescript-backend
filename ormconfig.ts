import './src/boilerplate.polyfill';

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

import { UserSubscriber } from './src/entity-subscribers/user-subscriber';
import { SnakeNamingStrategy } from './src/snake-naming.strategy';

dotenv.config({ path: './.env'});

// export const dataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   namingStrategy: new SnakeNamingStrategy(),
//   subscribers: [UserSubscriber],
//   entities: [
//     'src/modules/**/*.entity{.ts,.js}',
//     'src/modules/**/*.view-entity{.ts,.js}',
//   ],
//   migrations: ['src/database/migrations/*{.ts,.js}'],
// });

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nest',
      });
      return sequelize;
    },
  },
];