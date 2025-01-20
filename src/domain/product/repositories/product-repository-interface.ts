import { RepositoryInterface } from '../../shared/repositories/repository-interface';
import { Product } from '../entities/product';

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {
  findByName(name: string): Promise<Product | null>;
}
