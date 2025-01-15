import { Model } from 'sequelize';
import { Product } from '../../../../domain/entities/product';
import { ProductRepositoryInterface } from '../../../../domain/repositories/product-repository-interface';
import { ProductModel } from '../models/product-model';

export class ProductRepository implements ProductRepositoryInterface {
  private productModel: typeof ProductModel = ProductModel
  async findByName(name: string): Promise<Product  | null> {
    const product = await this.productModel.findOne({ where: { name } });
    if (!product) return null

    return new Product(product.id, product.name, product.price)
  }

  async create(entity: Product): Promise<void> {
    await this.productModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }

  async update(entity: Product): Promise<void> {
    await this.productModel.update({
      name: entity.name,
      price: entity.price
    }, { where: { id: entity.id } })
  }

  async findOne(entityId: string): Promise<Product | null> {
    const product = await this.productModel.findOne({ where: { id: entityId } });
    if (!product) return null

    return new Product(product.id, product.name, product.price)
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.findAll()
    
    return products.map(product => new Product(product.id, product.name, product.price))
  }

  async remove(entityId: string): Promise<void> {
    await this.productModel.destroy({ where: { id: entityId } })
  }
}
