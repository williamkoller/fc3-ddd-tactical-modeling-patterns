import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../models/product-model';
import { Product } from '../../../../domain/entities/product';
import { ProductRepository } from './product-repository';

describe('Product repository tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepo = new ProductRepository();
    const product = new Product('1', 'Any name', 100);
    await productRepo.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });
    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Any name',
      price: 100,
    });
  });

  it('should find a product by name', async () => {
    const productRepo = new ProductRepository();
    const product = new Product('1', 'Any name', 100);
    await productRepo.create(product);

    const productFound = await productRepo.findByName('Any name');
    expect(productFound).toStrictEqual(product);
  });

  it('should update a product', async () => {
    const productRepo = new ProductRepository();
    const product = new Product('1', 'Any name', 100);
    await productRepo.create(product);

    product.changeName('New name');
    product.changePrice(200);

    await productRepo.update(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });
    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'New name',
      price: 200,
    });
  });

  it('should find a product by id', async () => {
    const productRepo = new ProductRepository();
    const product = new Product('1', 'Any name', 100);
    await productRepo.create(product);

    const productFound = await productRepo.findOne('1');
    expect(productFound).toStrictEqual(product);
  });

  it('should find all products', async () => {
    const productRepo = new ProductRepository();
    const product1 = new Product('1', 'Any name', 100);
    const product2 = new Product('2', 'Other name', 200);
    await productRepo.create(product1);
    await productRepo.create(product2);

    const products = await productRepo.findAll();
    expect(products).toStrictEqual([product1, product2]);
  });

  it('should remove a product', async () => {
    const productRepo = new ProductRepository();
    const product = new Product('1', 'Any name', 100);
    await productRepo.create(product);

    await productRepo.remove('1');

    const productModel = await ProductModel.findOne({ where: { id: '1' } });
    expect(productModel).toBeNull();
  });
});
