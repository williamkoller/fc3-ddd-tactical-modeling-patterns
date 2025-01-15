import { CustomerMapper } from '../../../../application/mappers/customer-mapper';
import { Address } from '../../../../domain/entities/address';
import { Customer } from '../../../../domain/entities/customer';
import { CustomerRepositoryInterface } from '../../../../domain/repositories/customer-repository-interface';
import { CustomerModel } from '../models/customer-model';

export class CustomerRepository implements CustomerRepositoryInterface {
  private customerModel: typeof CustomerModel = CustomerModel;

  async create(customer: Customer): Promise<void> {
    const customerPersistence = CustomerMapper.toPersistence(customer);
    await this.customerModel.create(customerPersistence);
  }

  async update(customer: Customer): Promise<void> {
    const customerPersistence = CustomerMapper.toPersistence(customer);
    await this.customerModel.update(customerPersistence, {
      where: { id: customerPersistence.id },
    });
  }

  async findOne(customerId: string): Promise<Customer | null> {
    const customer = await this.customerModel.findOne({
      where: { id: customerId },
    });
    if (!customer) return null;

    return CustomerMapper.toDomain(
      new Customer(
        customer.id,
        customer.name,
        new Address(
          customer.street,
          customer.number,
          customer.zip,
          customer.city
        ),
        customer.active,
        customer.rewardPoints
      )
    );
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.customerModel.findAll();

    return customers.map(customer =>
      CustomerMapper.toDomain(
        new Customer(
          customer.id,
          customer.name,
          new Address(
            customer.street,
            customer.number,
            customer.zip,
            customer.city
          ),
          customer.active,
          customer.rewardPoints
        )
      )
    );
  }

  async remove(customerId: string): Promise<void> {
    await this.customerModel.destroy({ where: { id: customerId } });
  }
}
