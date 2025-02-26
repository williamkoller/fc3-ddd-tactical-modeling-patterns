import { Order } from '../../../../domain/checkout/entities/order';
import { OrderItem } from '../../../../domain/checkout/entities/order-item';
import { Customer } from '../../../../domain/customer/entities/customer';
import { Address } from '../../../../domain/customer/value-objects/address';
import { Product } from '../../../../domain/product/entities/product';
import { CustomerModel } from '../../../customer/models/sequelize/customer-model';
import { CustomerRepository } from '../../../customer/repositories/sequelize/customer-repository';
import { SequelizeConnection } from '../../../db/connection/sequelize/sequelize-connection';
import { ProductModel } from '../../../product/models/sequelize/product-model';
import { ProductRepository } from '../../../product/repositories/sequelize/product-repository';
import { OrderItemModel } from '../../models/sequelize/order-item-model';
import { OrderModel } from '../../models/sequelize/order-model';
import { OrderRepository } from './order-repository';

describe('Order repository tests', () => {
  let sequelizeConnec: SequelizeConnection;

  beforeAll(() => {
    sequelizeConnec = SequelizeConnection.getInstance();
  });

  beforeEach(async () => {
    const sequelize = sequelizeConnec.getSequelize();
    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    const sequelize = sequelizeConnec.getSequelize();
    await sequelize.drop();
  });

  afterAll(async () => {
    const sequelize = sequelizeConnec.getSequelize();
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepo = new CustomerRepository();
    const address = new Address('Any street', 300, 'Any zip code', 'Any city');
    const customer = new Customer('1', 'Any name');

    customer.changeAddress(address);
    await customerRepo.create(customer);

    const productRepo = new ProductRepository();
    const product = new Product('1', 'Any product', 100);

    await productRepo.create(product);
    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id
    );

    const orderRepo = new OrderRepository();
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepo.create(order);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel).not.toBeNull();
    expect(orderModel.toJSON()).toStrictEqual({
      id: '1',
      customerId: '1',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          productId: orderItem.productId,
          orderId: order.id,
        },
      ],
    });
  });

  it('should return an order by id', async () => {
    const customerRepo = new CustomerRepository();
    const address = new Address('Any street', 300, 'Any zip code', 'Any city');
    const customer = new Customer('1', 'Any name');

    customer.changeAddress(address);
    await customerRepo.create(customer);

    const productRepo = new ProductRepository();
    const product = new Product('1', 'Any product', 100);

    await productRepo.create(product);
    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id
    );

    const orderRepo = new OrderRepository();
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepo.create(order);
    const orderFound = await orderRepo.findOne(order.id);

    expect(orderFound).not.toBeNull();
    expect(orderFound).toStrictEqual(order);
  });

  it('should return all orders', async () => {
    const customerRepo = new CustomerRepository();
    const address = new Address('Any street', 300, 'Any zip code', 'Any city');
    const customer = new Customer('1', 'Any name');

    customer.changeAddress(address);
    await customerRepo.create(customer);

    const productRepo = new ProductRepository();
    const product = new Product('1', 'Any product', 100);

    await productRepo.create(product);
    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id
    );

    const orderRepo = new OrderRepository();
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepo.create(order);
    const orders = await orderRepo.findAll();

    expect(orders).toHaveLength(1);
    expect(orders[0]).toStrictEqual(order);
  });

  it('should update an order', async () => {
    const customerRepo = new CustomerRepository();
    const address = new Address('Any street', 300, 'Any zip code', 'Any city');
    const customer = new Customer('1', 'Any name');

    customer.changeAddress(address);
    await customerRepo.create(customer);

    const productRepo = new ProductRepository();
    const product = new Product('1', 'Any product', 100);

    await productRepo.create(product);
    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id
    );

    const orderRepo = new OrderRepository();
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepo.create(order);
    order.items[0].quantity = 2;
    await orderRepo.update(order);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel).not.toBeNull();
    expect(orderModel.toJSON()).toStrictEqual({
      id: '1',
      customerId: '1',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          productId: orderItem.productId,
          orderId: order.id,
        },
      ],
    });
  });

  it('should remove a order', async () => {
    const customerRepo = new CustomerRepository();
    const address = new Address('Any street', 300, 'Any zip code', 'Any city');
    const customer = new Customer('1', 'Any name');

    customer.changeAddress(address);
    await customerRepo.create(customer);

    const productRepo = new ProductRepository();
    const product = new Product('1', 'Any product', 100);

    await productRepo.create(product);
    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id
    );

    const orderRepo = new OrderRepository();
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepo.create(order);

    await orderRepo.remove(order.id);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
    });

    expect(orderModel).toBeNull();
  });
});
