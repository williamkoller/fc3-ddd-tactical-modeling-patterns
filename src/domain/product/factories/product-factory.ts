import { randomUUID } from 'node:crypto';
import { Product } from '../entities/product';
import { ProductInterface } from '../entities/product-interface';
import { ProductB } from '../entities/product-b';

export class ProductFactory {
  static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case 'a':
        return new Product(randomUUID(), name, price);
      case 'b':
        return new ProductB(randomUUID(), name, price);
      default:
        throw new Error('Invalid product type');
    }
  }
}
