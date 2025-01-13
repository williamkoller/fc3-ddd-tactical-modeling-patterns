import { Address } from './address';
import { Customer } from './customer';

describe(Customer.name, () => {
  const customer = new Customer('1', 'John Doe');
  const address = new Address('1', 123, 'Springfield', 'USA');

  it('should be defined', () => {
    expect(customer).toBeDefined();
  });

  it('should throw error when id is empty', () => {
    expect(() => new Customer('', 'John Doe')).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new Customer('1', '')).toThrow('Name is required');
  });

  it('should return correct customer', () => {
    expect(customer.id).toBe('1');
    expect(customer.name).toBe('John Doe');
  });

  it('should change name', () => {
    customer.changeName('John');
    expect(customer.name).toBe('John');
  });

  it('should activate customer', () => {
    customer.addAddress(address);
    customer.activate();
    expect(customer.active).toBeTruthy();
  });

  it('should deactivate customer', () => {
    customer.deactivate();
    expect(customer.active).toBeFalsy();
  });

  it('should throw error when activating customer without address', () => {
    const customerWithoutAddress = new Customer('1', 'John Doe');
    expect(() => customerWithoutAddress.activate()).toThrow(
      'Address is mandatory to activate a customer'
    );
  });

  it('should add address', () => {
    customer.addAddress(address);
    expect(customer.address).toBe(address);
  });

  it('should add reward points', () => {
    const customer = new Customer('c1', 'Customer 1');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
