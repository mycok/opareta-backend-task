import { Database } from 'sqlite3';

import { deleteAllForCustomer, calculateCustomerAPY, validAPYObject } from './setup';
import { expect } from '..';
import { openDB } from '../../database/sqlite';

describe('Delete all customer APY calculations', () => {
  let db: Database;
  before(() => {
    db = openDB();
  });

  after(() => db.close());

  describe('When a customer sends a request to delete all APY computation history', () => {
    beforeEach(async () => {
      await calculateCustomerAPY(validAPYObject);
    });
    it('All the customer APY computations should be deleted ', async () => {
      const res = await deleteAllForCustomer(String(validAPYObject.customer_id));

      expect(res.status).to.be.equal(200);
      expect(res.body.rowsChanged).to.be.equal(1);
    });
  });
});
