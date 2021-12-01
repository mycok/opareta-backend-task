import { Database } from 'sqlite3';

import {
  fetchAllForCustomer,
  calculateCustomerAPY,
  deleteAllForCustomer,
  validAPYObject,
} from './setup';
import { expect } from '..';
import { openDB } from '../../database/sqlite';

describe('List all customer APY calculations', () => {
  let db: Database;
  before(() => {
    db = openDB();
  });

  after(() => db.close());

  describe('When a customer sends a request to view all APY computation history', () => {
    beforeEach(async () => {
      await calculateCustomerAPY(validAPYObject);
    });

    afterEach(async () => {
      await deleteAllForCustomer(String(validAPYObject.customer_id));
    });
    it('An array of all the customer APY computations should be returned ', async () => {
      const res = await fetchAllForCustomer(String(validAPYObject.customer_id));

      expect(res.status).to.be.equal(200);
      expect(res.body.results.length).to.be.equal(1);
    });
  });
});
