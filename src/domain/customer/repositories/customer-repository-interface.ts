import { RepositoryInterface } from '../../repositories/repository-interface';
import { Customer } from '../entities/customer';

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
