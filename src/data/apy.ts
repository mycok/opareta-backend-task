export class APY {
  id?: number;

  deposit: number;

  interest_rate: number;

  annual_compound_time: number;

  customer_id: number;

  apy?: number;

  final_value?: number;

  constructor(
    deposit: number,
    interest_rate: number,
    annual_compound_time: number,
    customer_id: number,
  ) {
    this.deposit = deposit;
    this.interest_rate = interest_rate;
    this.annual_compound_time = annual_compound_time;
    this.customer_id = customer_id;
  }

  validate() {
    if (!this.deposit || !this.interest_rate || !this.annual_compound_time || !this.customer_id) {
      throw new Error('Missing a required field value');
    }
    return this;
  }
}
