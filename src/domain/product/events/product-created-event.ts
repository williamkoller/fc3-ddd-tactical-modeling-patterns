import { EventInterface } from '../../shared/events/event-interface';

export class ProductCreatedEvent<T> implements EventInterface {
  dataTimeOccurred: Date;
  eventData: T;

  constructor(product: T) {
    this.dataTimeOccurred = new Date();
    this.eventData = product;
  }
}
