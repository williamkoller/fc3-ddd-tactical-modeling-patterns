import { Sequelize } from 'sequelize-typescript';

export class SequelizeConnection {
  private static instance: SequelizeConnection;
  private sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
  }

  public static getInstance(): SequelizeConnection {
    if (!SequelizeConnection.instance) {
      SequelizeConnection.instance = new SequelizeConnection();
    }

    return SequelizeConnection.instance;
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }
}
