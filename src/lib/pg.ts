import {Pool} from 'pg';
import {DataSource, DataSourceOptions} from "typeorm"

import {CardModel} from "@src/models/card.model";
import config from "@src/config";

export const pgDataSource = new DataSource({
  type: "postgres",
  host: config.pg.host,
  port: parseInt(config.pg.host || '5432', 10),
  username: config.pg.user,
  password: config.pg.password,
  database: config.pg.database,
  entities: [CardModel]
})
pgDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })