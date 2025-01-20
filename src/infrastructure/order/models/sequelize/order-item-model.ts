import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OrderModel } from './order-model';
import { ProductModel } from '../../../product/models/sequelize/product-model'

@Table({ tableName: 'items', timestamps: false, underscored: true })
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  declare price: number;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  declare quantity: number;

  @ForeignKey(() => ProductModel)
  @AllowNull(false)
  @Column(DataType.STRING)
  declare productId: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @AllowNull(false)
  @Column(DataType.STRING)
  declare orderId: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;
}
