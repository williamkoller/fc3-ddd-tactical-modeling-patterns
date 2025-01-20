import { EventHandlerInterface } from './event-handler-interface';
import { EventInterface } from './event-interface';

export interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, handler: EventHandlerInterface): void;
  unregister(eventName: string, handler: EventHandlerInterface): void;
  unregisterAll(): void;
}
