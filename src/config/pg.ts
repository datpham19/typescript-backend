import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import {DataSource, DataSourceOptions} from "typeorm"

import {UsersModel} from "../models/users.model";

dotenv.config();


export const dataSource = new DataSource({
  type: "postgres",
  host: process.env['DB_HOST'],
  port: parseInt(process.env['DB_PORT'] || '5432', 10),
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  entities: [UsersModel]
})
dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

export class TestHelper {
  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dbConnect!: DataSource;
  private testdb!: any;
  async setupTestDB() {

    this.dbConnect = new DataSource({
      type: "postgres",
      host: process.env['DB_HOST'],
      port: parseInt(process.env['DB_PORT'] || '5432', 10),
      username: process.env['DB_USER'],
      password: process.env['DB_PASSWORD'],
      database: process.env['DB_NAME'],
      entities: [UsersModel],
      synchronize: true,
    } as DataSourceOptions);

    await this.dbConnect.initialize().then(() => {
      console.log("DB has been initialized!")
    })
      .catch((err) => {
        console.error("Error during DB initialization", err)
      })

  }

  teardownTestDB() {
    this.dbConnect.destroy();
    this.testdb.close();
  }
}