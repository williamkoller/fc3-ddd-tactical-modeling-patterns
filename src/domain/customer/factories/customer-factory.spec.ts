import { Customer } from '../entities/customer';
import { Address } from '../value-objects/address';
import { CustomerFactory } from './customer-factory';

describe('Customer factory tests', () => {
  it('should create a customer', () => {
    const customerFactory = CustomerFactory.create('John Doe');

    expect(customerFactory).toBeInstanceOf(Customer);
    expect(customerFactory.name).toBe('John Doe');
    expect(customerFactory.address).toBeUndefined();
  });

  it('should create a customer with address', () => {
    const address = new Address('Main St', 123, '13330-456', 'New York');

    const customerFactory = CustomerFactory.createWithAddress(
      'John Doe',
      address
    );

    expect(customerFactory).toBeInstanceOf(Customer);
    expect(customerFactory.name).toBe('John Doe');
    expect(customerFactory.address).toBeInstanceOf(Address);
    expect(customerFactory.address.street).toBe('Main St');
    expect(customerFactory.address.number).toBe(123);
    expect(customerFactory.address.zip).toBe('13330-456');
    expect(customerFactory.address.city).toBe('New York');
  });
});
