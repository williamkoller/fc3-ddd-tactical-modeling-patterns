import { EventHandlerInterface } from '../../../shared/events/event-handler-interface';
import { EventInterface } from '../../../shared/events/event-interface';
import { Customer } from '../../entities/customer';
import { CustomerCreatedEvent } from '../customer-created-event';

export class SendEmailWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent<Customer>>
{
  handle(event: EventInterface): void {
    console.log(`Send email ${JSON.stringify(event)}`);
  }
}
