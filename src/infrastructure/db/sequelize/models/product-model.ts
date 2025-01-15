import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'products', timestamps: false })
export class ProductModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  declare price: number;
}
