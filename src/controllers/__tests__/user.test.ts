import { UserControllers } from '../user.controllers';
import { UserRepository } from '../../repositories/UserRepo';
import {UsersModel} from "../../models/users.model";

import * as request from "supertest";
import {Express} from 'express-serve-static-core'

import app from "../../index";
import {before} from "node:test";
import { TestHelper } from '../../config/pg'
beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
})

describe('Users', () => {
  const userController = new UserControllers();

  it('should return an array of users', async () => {
    const res = await request(app).get("api/v1/users");
    expect(res.status).toEqual(200);
    console.log(res)
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(10);
  });
});
