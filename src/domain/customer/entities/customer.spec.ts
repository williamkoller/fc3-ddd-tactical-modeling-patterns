import { EventDispatcher } from '../../shared/events/event-dispatcher';
import { CustomerAddressChangedEvent } from '../events/customer-address-changed-event';
import { Address } from '../value-objects/address';
import { Customer } from './customer';

jest.mock('../../shared/events/event-dispatcher');

describe(Customer.name, () => {
  let eventDispatcher: EventDispatcher;
  const customer = new Customer('1', 'John Doe');
  const address = new Address('1', 123, 'Springfield', 'USA');

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
    (EventDispatcher as jest.Mock).mockImplementation(() => eventDispatcher);
  });

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
    const spy = jest.spyOn(eventDispatcher, 'notify');
    const customer = new Customer(
      '1',
      'John Doe',
      new Address('Street 1', 123, 'Springfield', 'USA')
    );

    customer.changeAddress(new Address('Street 2', 455, 'Springfield', 'USA'));

    expect(spy).toHaveBeenCalledWith(expect.any(CustomerAddressChangedEvent));
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
    customer.changeAddress(address);
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
