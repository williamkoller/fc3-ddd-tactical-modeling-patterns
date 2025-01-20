import { Product } from '../../domain/product/entities/product';

export class ProductMapper {
  static toDomain(domain: Product): Product {
    return new Product(domain.id, domain.name, domain.price);
  }

  static toPersistence(domain: Product) {
    return {
      id: domain.id,
      name: domain.name,
      price: domain.price,
    };
  }
}
