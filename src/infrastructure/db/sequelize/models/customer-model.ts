import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'customers', timestamps: false, underscored: true })
export class CustomerModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.BOOLEAN)
  declare active: boolean;

  @Column(DataType.NUMBER)
  declare rewardPoints: number;

  @Column(DataType.STRING)
  declare street: string;

  @Column(DataType.NUMBER)
  declare number: number;

  @Column(DataType.STRING)
  declare zip: string;

  @Column(DataType.STRING)
  declare city: string;
}
