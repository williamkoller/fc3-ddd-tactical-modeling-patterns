import { EventHandlerInterface } from '../../../events/shared/event-handler-interface';
import { EventInterface } from '../../../events/shared/event-interface';
import { ProductCreatedEvent } from '../product-created-event';

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: EventInterface): void {
    console.log(`Send email ${JSON.stringify(event)}`);
  }
}
