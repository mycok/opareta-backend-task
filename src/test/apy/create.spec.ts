import { Database } from 'sqlite3';

import {
  calculateCustomerAPY,
  deleteAllForCustomer,
  apyMissingRequiredParams,
  validAPYObject,
} from './setup';
import { expect } from '..';
import { openDB } from '../../database/sqlite';

describe('Calculate customer APY', () => {
  let db: Database;
  before(() => {
    db = openDB();
  });

  after(() => db.close());

  describe('When a customer sends a request with missing required fields', () => {
    it('An error should be returned informing the user of missing fields', async () => {
      const res = await calculateCustomerAPY(apyMissingRequiredParams);

      expect(res.status).to.be.equal(400);
      expect(res.body.error).to.be.equal('Missing a required field value');
    });
  });

  describe('When a customer sends a request with valid data', () => {
    afterEach(async () => {
      await deleteAllForCustomer(String(validAPYObject.customer_id));
    });
    it('An APY should successfully be calculated and stored in the db', async () => {
      const res = await calculateCustomerAPY(validAPYObject);

      expect(res.status).to.be.equal(201);
    });
  });
});
