import { Product } from '../entities/product';

export class ProductService {
  public static increasePrice(
    products: Product[],
    percentage: number
  ): Array<Product> {
    products.forEach((product) => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });

    return products;
  }
}
