import { Customer } from '../entities/customer';
import { RepositoryInterface } from './repository-interface';

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
