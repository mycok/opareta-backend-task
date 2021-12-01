import { chaiWithHttp, app, baseUrl } from '..';

export function calculateCustomerAPY(apy: any): Promise<any> {
  return chaiWithHttp
    .request(app)
    .post(`${baseUrl}/apy`)
    .set('Accept', 'application/json')
    .send(apy);
}

export function fetchAllForCustomer(id: string): Promise<any> {
  return chaiWithHttp
    .request(app)
    .get(`${baseUrl}/apy/${id}`);
}

export function deleteAllForCustomer(id: string): Promise<any> {
  return chaiWithHttp
    .request(app)
    .delete(`${baseUrl}/apy/${id}`);
}

export const apyMissingRequiredParams = {
  deposit: 100,
  interest_rate: 2,
  annual_compound_time: 12,
};

export const validAPYObject = {
  deposit: 100,
  interest_rate: 2,
  annual_compound_time: 12,
  customer_id: 3,
};
