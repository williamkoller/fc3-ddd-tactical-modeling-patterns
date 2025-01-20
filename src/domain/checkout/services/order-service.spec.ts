import { Customer } from '../../customer/entities/customer';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/order-item';
import { OrderService } from './order-service';

describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('c1', 'Customer 1');

    const orderItemOne = new OrderItem('i1', 'Item 1', 100, 1, 'p1');

    const order = OrderService.placeOrder(customer, [orderItemOne]);

    expect(customer.rewardPoints).toBe(50);
    expect(order.total()).toBe(100);
  });

  it('should get total of all orders', () => {
    const orderItemOne = new OrderItem('i1', 'Item 1', 100, 1, 'p1');
    const orderItemTwo = new OrderItem('i2', 'Item 2', 200, 2, 'p2');

    const orderOne = new Order('o1', 'Order 1', [orderItemOne]);
    const orderTwo = new Order('o2', 'Order 2', [orderItemTwo]);

    const total = OrderService.total([orderOne, orderTwo]);
    expect(total).toBe(500);
  });
});
