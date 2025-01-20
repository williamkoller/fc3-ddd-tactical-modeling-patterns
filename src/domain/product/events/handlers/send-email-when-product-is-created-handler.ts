import { EventHandlerInterface } from '../../../shared/events/event-handler-interface';
import { EventInterface } from '../../../shared/events/event-interface';
import { Product } from '../../entities/product';
import { ProductCreatedEvent } from '../product-created-event';

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent<Product>>
{
  handle(event: EventInterface): void {
    console.log(`Send email ${JSON.stringify(event)}`);
  }
}
