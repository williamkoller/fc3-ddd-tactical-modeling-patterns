import { randomUUID } from 'node:crypto';
import { Customer } from '../entities/customer';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/order-item';

export class OrderService {
  public static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0)
      throw new Error('Order must have at least one item');
    const order = new Order(randomUUID(), customer.id, items);

    customer.addRewardPoints(order.total() / 2);

    return order;
  }

  public static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
