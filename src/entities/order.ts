import { OrderItem } from './order-item';

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: Array<OrderItem> = [];

  constructor(id: string, customerId: string, items: Array<OrderItem>) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): Array<OrderItem> {
    return this._items;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }

  validate(): boolean {
    if (this._id.length === 0) throw new Error('Order must have an id');
    if (this._customerId.length === 0)
      throw new Error('Order must have a customer id');
    if (this._items.length === 0) throw new Error('Items are required');

    return true;
  }
}
