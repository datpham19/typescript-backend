import { Model, DataTypes, Sequelize } from 'sequelize';
import logger from "../utils/logger";
import config from "../config";

export default class PostgreSQL {
  private readonly sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: config.pg.host,
      port: config.pg.port,
      username: config.pg.user,
      password: config.pg.password,
      database: config.pg.database
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate().then(() => {
        logger.info('Connection has been established successfully.')
      });
    } catch (error) {
      logger.error('Unable to connect to the database:', error);
    }
  }
}
