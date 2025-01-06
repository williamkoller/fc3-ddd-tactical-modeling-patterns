import { OrderItem } from './order-item';

export class Order {
  _id: string;
  _customerId: string;
  _items: Array<OrderItem> = [];

  constructor(id: string, customerId: string, items: Array<OrderItem>) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
  }

  
}
