import { Order } from '../entities/order';
import { OrderItem } from '../entities/order-item';

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    productId: string;
  }>;
}

export class OrderFactory {
  static create(orderProps: OrderFactoryProps): Order {
    return new Order(
      orderProps.id,
      orderProps.customerId,
      orderProps.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.quantity,
            item.productId
          )
      )
    );
  }
}
