import { EventHandlerInterface } from '../../../shared/events/event-handler-interface';
import { EventInterface } from '../../../shared/events/event-interface';
import { ProductCreatedEvent } from '../product-created-event';

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: EventInterface): void {
    console.log(`Send email ${JSON.stringify(event)}`);
  }
}
