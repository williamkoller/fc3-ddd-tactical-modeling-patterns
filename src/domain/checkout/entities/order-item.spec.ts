import { OrderItem } from './order-item';

describe(OrderItem.name, () => {
  const orderItem = new OrderItem('1', 'name', 1.99, 2, 'p1');

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

  it('should have a quantity', () => {
    expect(orderItem.quantity).toBe(2);
  });

  it('should have a quantity', () => {
    expect(orderItem.productId).toBe('p1');
  });

  it('should have a orderItemTotal', () => {
    expect(orderItem.orderItemTotal()).toBe(3.98);
  });

  it('should throw error if price is less or equal zero', () => {
    expect(() => new OrderItem('1', 'name', -0, 2, 'p1')).toThrow(
      'Price must be greater than zero'
    );
  });

  it('should throw error if quantity is less or equal zero', () => {
    expect(() => new OrderItem('1', 'name', 100, -0, 'p1')).toThrow(
      'Quantity must be greater than zero'
    );
  });
});
