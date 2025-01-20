import { Product } from '../entities/product';
import { ProductB } from '../entities/product-b';
import { ProductFactory } from './product-factory';

describe('Product factory tests', () => {
  it('should create a product type a', () => {
    const productFactory = ProductFactory.create('a', 'Product A', 1);

    expect(productFactory).toBeInstanceOf(Product);
    expect(productFactory.id).toBeDefined();
    expect(productFactory.name).toBe('Product A');
    expect(productFactory.price).toBe(1);
  });

  it('should create a product type b', () => {
    const productFactory = ProductFactory.create('b', 'Product b', 2);

    expect(productFactory).toBeInstanceOf(ProductB);
    expect(productFactory.id).toBeDefined();
    expect(productFactory.name).toBe('Product b');
    expect(productFactory.price).toBe(2);
  });

  it('should throw an error when invalid product type', () => {
    expect(() => ProductFactory.create('c', 'Product c', 3)).toThrow(
      'Invalid product type'
    );
  });
});
