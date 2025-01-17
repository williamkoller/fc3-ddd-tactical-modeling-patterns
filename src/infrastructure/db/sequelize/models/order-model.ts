import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CustomerModel } from './customer-model';
import { OrderItemModel } from './order-item-model';

@Table({ tableName: 'orders', timestamps: false, underscored: true })
export class OrderModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @AllowNull(false)
  @Column(DataType.STRING)
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @AllowNull(true)
  @Column(DataType.NUMBER)
  declare total: number;

  @HasMany(() => OrderItemModel)
  declare items: Array<OrderItemModel>;
}
