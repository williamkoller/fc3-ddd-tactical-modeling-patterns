import { Order } from '../../../../domain/entities/order';
import { OrderItem } from '../../../../domain/entities/order-item';
import { OrderRepositoryInterface } from '../../../../domain/repositories/order-repository-interface';
import { OrderItemModel } from '../models/order-item-model';
import { OrderModel } from '../models/order-model';

export class OrderRepository implements OrderRepositoryInterface {
  private orderModel: typeof OrderModel = OrderModel;

  async create(order: Order): Promise<void> {
    await this.orderModel.create(
      {
        id: order.id,
        customerId: order.customerId,
        total: order.total(),
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
        })),
      },
      {
        include: [
          {
            model: OrderItemModel,
          },
        ],
      }
    );
  }

  async update(order: Order): Promise<void> {
    await this.orderModel.update(order, {
      where: { id: order.id },
    });
  }

  async findOne(orderId: string): Promise<Order | null> {
    const order = await this.orderModel.findOne({
      where: { id: orderId },
      include: ['items'],
    });
    if (!orderId) return null;

    const items = order.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.quantity,
          item.productId
        )
    );

    return new Order(order.id, order.customerId, items);
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel.findAll({
      include: ['items'],
    });

    const [items] = orders.map((order) =>
      order.items.map(
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

    return orders.map((order) => new Order(order.id, order.customerId, items));
  }

  async remove(orderId: string): Promise<void> {
    await this.orderModel.destroy({ where: { id: orderId } });
  }
}
