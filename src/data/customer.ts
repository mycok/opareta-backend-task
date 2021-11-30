export class Customer {
  id?: number;

  username: string;

  constructor(username: string) {
    this.username = username;
  }

  validate() {
    if (typeof this.username === 'undefined' || this.username === '') {
      throw new Error('Please provide a username');
    }

    return this;
  }
}
