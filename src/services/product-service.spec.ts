import { Product } from '../entities/product'
import { ProductService } from './product-service'

describe('Product service unit tests', () => {
  it('should change the prices of all products', () => {
    const productOne = new Product('1', 'product one', 10)
    const productTwo = new Product('2', 'product tow', 20)

    const products = [productOne, productTwo]

    ProductService.increasePrice(products, 100)

    expect(productOne.price).toBe(20)
    expect(productTwo.price).toBe(40)
  });
});