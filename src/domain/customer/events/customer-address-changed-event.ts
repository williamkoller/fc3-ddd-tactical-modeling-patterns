import { EventInterface } from '../../shared/events/event-interface';
import { Address } from '../value-objects/address';

export class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
