import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {expect} from "chai";

import app from '@src/app';

import {Container} from "typedi";

chai.use(chaiHttp);

describe('UserControllers', () => {
  describe('GET /users', () => {
    it('should return an array of users', async () => {
      const res = await chai.request("localhost:3030").get('/api/v1/users');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(10);
    });
    it('a user should have a name and an id', async () => {
      const res = await chai.request("localhost:3030").get('/api/v1/users');
      expect(res).to.have.status(200);
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0]).to.have.property('name');
    });
  });
});
