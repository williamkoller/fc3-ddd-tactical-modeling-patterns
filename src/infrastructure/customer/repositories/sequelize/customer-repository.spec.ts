import { Customer } from '../../../../domain/customer/entities/customer';
import { Address } from '../../../../domain/customer/value-objects/address';
import { SequelizeConnection } from '../../../db/connection/sequelize/sequelize-connection';
import { CustomerModel } from '../../models/sequelize/customer-model';
import { CustomerRepository } from './customer-repository';

describe('Customer repository tests', () => {
  let sequelizeConnec: SequelizeConnection;

  beforeAll(() => {
    sequelizeConnec = SequelizeConnection.getInstance();
  });

  beforeEach(async () => {
    const sequelize = sequelizeConnec.getSequelize();
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    const sequelize = sequelizeConnec.getSequelize();
    await sequelize.drop();
  });

  afterAll(async () => {
    const sequelize = sequelizeConnec.getSequelize();
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
