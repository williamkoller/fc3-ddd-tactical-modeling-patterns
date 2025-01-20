import { OrderFactory } from './order-factory';

describe('Order factory tests', () => {
  it('should create an order', () => {
    const orderProps = {
      id: 'order-id',
      customerId: 'customer-id',
      items: [
        {
          id: 'item-id',
          name: 'item-name',
          quantity: 1,
          price: 100,
          productId: 'product-id',
        },
      ],
    };

    const orderFactory = OrderFactory.create(orderProps);

    expect(orderFactory.id).toBe('order-id');
    expect(orderFactory.customerId).toBe('customer-id');
    expect(orderFactory.items.length).toBe(1);
    expect(orderFactory.items[0].id).toBe('item-id');
    expect(orderFactory.items[0].name).toBe('item-name');
    expect(orderFactory.items[0].quantity).toBe(1);
    expect(orderFactory.items[0].price).toBe(100);
    expect(orderFactory.items[0].productId).toBe('product-id');
  });
});
