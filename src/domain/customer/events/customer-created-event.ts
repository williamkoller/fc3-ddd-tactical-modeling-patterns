import { EventInterface } from '../../shared/events/event-interface';

export class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(product: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = product;
  }
}
