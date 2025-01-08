import { OrderItem } from './order-item';

describe(OrderItem.name, () => {
  const orderItem = new OrderItem('1', 'name', 1.99);

  it('should be defined', () => {
    expect(orderItem).toBeDefined();
  });

  it('should have an id', () => {
    expect(orderItem.id).toBe('1');
  });

  it('should have a name', () => {
    expect(orderItem.name).toBe('name');
  });

  it('should have a price', () => {
    expect(orderItem.price).toBe(1.99);
  });
});
