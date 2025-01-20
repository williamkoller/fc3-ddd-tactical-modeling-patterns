import { randomUUID } from 'node:crypto';
import { Customer } from './domain/customer/entities/customer';
import { OrderItem } from './domain/checkout/entities/order-item';
import { Order } from './domain/checkout/entities/order';
import { Address } from './domain/customer/value-objects/address';

const customer = new Customer(randomUUID(), 'William');
const address = new Address('Rua Luziano D', 123, '12345-678', 'Curitiba');

customer.changeAddress(address);

console.log({
  id: customer.id,
  name: customer.name,
  address: customer.address.fullAddress(),
});

customer.changeName('William Koller');
customer.changeAddress(
  new Address('Rua Edmundo S', 432, '83005-000', 'São José dos Pinhais')
);
customer.activate();

console.log({
  id: customer.id,
  name: customer.name,
  address: customer.address.fullAddress(),
  active: customer.active,
});

const orderItem = new OrderItem(randomUUID(), 'Laptop', 5000, 2, 'p1');
const orderItemTwo = new OrderItem(randomUUID(), 'Mouse', 50, 3, 'p1');

const order = new Order(randomUUID(), customer.id, [orderItem, orderItemTwo]);

console.log({
  item: order.items,
  order: order,
  total: order.total(),
});
