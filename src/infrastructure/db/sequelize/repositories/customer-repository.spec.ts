import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../models/customer-model';
import { Customer } from '../../../../domain/entities/customer';
import { Address } from '../../../../domain/entities/address';
import { CustomerRepository } from './customer-repository';

describe('Customer repository tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customerRepo = new CustomerRepository();
    const address = new Address('Any street', 300, 'Any zip code', 'Any city');
    const customer = new Customer('1', 'Any name');
    customer.addAddress(address);
    customer.activate();
    customer.addRewardPoints(100);
    await customerRepo.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Any name',
      active: true,
      street: 'Any street',
      number: 300,
      zip: 'Any zip code',
      city: 'Any city',
      rewardPoints: 100,
    });
  });

  it('should update a customer', async () => {
    const customerRepo = new CustomerRepository();
    const address = new Address('Any street', 300, 'Any zip code', 'Any city');
    const customer = new Customer('1', 'Any name');
    customer.addAddress(address);
    await customerRepo.create(customer);

    customer.changeName('New name');
    customer.addRewardPoints(100);
    customer.deactivate();

    await customerRepo.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'New name',
      active: false,
      street: 'Any street',
      number: 300,
      zip: 'Any zip code',
      city: 'Any city',
      rewardPoints: 100,
    });
  });

  it('should find a customer', async () => {
    const customerRepo = new CustomerRepository();
    const customer = new Customer('1', 'Any name');
    const address = new Address('Any street', 300, 'Any zip code', 'Any city');
    customer.addAddress(address);

    await customerRepo.create(customer);

    const foundCustomer = await customerRepo.findOne('1');
    expect(foundCustomer).toStrictEqual(customer);
  });
});
