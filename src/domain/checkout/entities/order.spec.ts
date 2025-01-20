import { Order } from './order';
import { OrderItem } from './order-item';

describe(Order.name, () => {
  const orderItemOne = new OrderItem('1', '1', 100, 2, 'p1');
  const orderItemTwo = new OrderItem('2', '2', 200, 3, 'p2');
  const order = new Order('1', '1', [orderItemOne, orderItemTwo]);

  it('should be defined', () => {
    expect(order).toBeDefined();
  });

  it('should throw when id is empty', () => {
    expect(() => new Order('', '1', [orderItemOne])).toThrow(
      'Order must have an id'
    );
  });

  it('should throw when customerId is empty', () => {
    expect(() => new Order('1', '', [orderItemOne])).toThrow(
      'Order must have a customer id'
    );
  });

  it('should throw when items is empty', () => {
    expect(() => new Order('1', 'order 1', [])).toThrow('Items are required');
  });

  it('should return the total price', () => {
    expect(order.total()).toBe(800);
  });

  it('should return correct order', () => {
    expect(order.id).toBe('1');
    expect(order.customerId).toBe('1');
    expect(order.items).toEqual([orderItemOne, orderItemTwo]);
  });
});
