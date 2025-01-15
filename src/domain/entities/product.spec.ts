import { Product } from './product';

describe(Product.name, () => {
  it('should throw error when id is empty', () => {
    expect(() => new Product('', 'Product 1', 100)).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new Product('1', '', 100)).toThrow('Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => new Product('1', 'Product 1', -1)).toThrow(
      'Price must be greater than zero'
    );
  });

  it('should be create a product', () => {
    const product = new Product('1', 'Product 1', 100);

    expect(product).toBeDefined();
    expect(product.id).toBe('1');
    expect(product.name).toBe('Product 1');
    expect(product.price).toBe(100);
  });

  it('should be change name', () => {
    const product = new Product('1', 'Product 1', 100);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should be change price', () => {
    const product = new Product('1', 'Product 1', 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
