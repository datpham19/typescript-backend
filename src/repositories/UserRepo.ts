import {Repository} from 'typeorm';
import {dataSource} from '../config/pg';
import {UsersModel} from '../models/users.model';
import {Service} from "typedi";


@Service()
export class UserRepository extends Repository<UsersModel> {
  async getUsers(): Promise<UsersModel[]> {
    const users = dataSource.getRepository(UsersModel).find({take: 10});
    return users;
  }
}
