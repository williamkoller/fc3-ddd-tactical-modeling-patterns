import { Address } from '../../domain/customer/entities/address';
import { Customer } from '../../domain/customer/entities/customer';

export class CustomerMapper {
  static toDomain(domain: Customer): Customer {
    return new Customer(
      domain.id,
      domain.name,
      new Address(
        domain.address.street,
        domain.address.number,
        domain.address.zip,
        domain.address.city
      ),
      domain.active,
      domain.rewardPoints
    );
  }
  static toPersistence(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip,
      city: customer.address.city,
      active: customer.active,
      rewardPoints: customer.rewardPoints,
    };
  }
}
