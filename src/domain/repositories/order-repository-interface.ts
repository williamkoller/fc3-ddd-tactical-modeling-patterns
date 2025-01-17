import { Order } from '../entities/order';
import { RepositoryInterface } from './repository-interface';

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
