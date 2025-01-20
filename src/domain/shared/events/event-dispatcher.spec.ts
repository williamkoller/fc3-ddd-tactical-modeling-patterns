import { Customer } from '../../customer/entities/customer';
import { CustomerAddressChangedEvent } from '../../customer/events/customer-address-changed-event';
import { CustomerCreatedEvent } from '../../customer/events/customer-created-event';
import { EnviaConsoleLogHandler } from '../../customer/events/handlers/envia-console.log-handler';
import { SendEmailWhenCustomerIsCreatedHandler } from '../../customer/events/handlers/send-email-when-customer-is-created-handler';
import { Address } from '../../customer/value-objects/address';
import { SendEmailWhenProductIsCreatedHandler } from '../../product/events/handlers/send-email-when-product-is-created-handler';
import { ProductCreatedEvent } from '../../product/events/product-created-event';
import { EventDispatcher } from './event-dispatcher';

describe('Domain events tests', () => {
  describe('ProductCreatedEvent', () => {
    it('should register an event handler', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent']
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
      ).toMatchObject(eventHandler);
    });

    it('should unregister an event handler', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent']
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'].length
      ).toBe(0);
    });

    it('should unregister all event handlers', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent']
      ).toBeUndefined();
      expect(Object.keys(eventDispatcher.getEventHandlers).length).toBe(0);
    });

    it('should notify all event handlers', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, 'handle');

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
      ).toMatchObject(eventHandler);

      const productCreatedEvent = new ProductCreatedEvent({
        name: 'Product 1',
        description: 'Product 1 description',
        price: 100,
      });

      eventDispatcher.notify(productCreatedEvent);
      expect(spyEventHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('CustomerCreatedEvent', () => {
    it('should register an event handler', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();

      eventDispatcher.register('CustomerCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent']
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]
      ).toMatchObject(eventHandler);
    });

    it('should unregister an event handler', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();

      eventDispatcher.register('CustomerCreatedEvent', eventHandler);

      eventDispatcher.unregister('CustomerCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent']
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
      ).toBe(0);
    });

    it('should unregister all event handlers', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();

      eventDispatcher.register('CustomerCreatedEvent', eventHandler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent']
      ).toBeUndefined();
      expect(Object.keys(eventDispatcher.getEventHandlers).length).toBe(0);
    });

    it('should notify all event handlers', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, 'handle');

      eventDispatcher.register('CustomerCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]
      ).toMatchObject(eventHandler);

      const customer = new Customer('1', 'John Doe');
      const address = new Address('1', 123, 'Springfield', 'USA');

      customer.changeAddress(address);

      const customerCreatedEvent = new CustomerCreatedEvent(customer);

      eventDispatcher.notify(customerCreatedEvent);
      expect(spyEventHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('CustomerAddressChangedEvent', () => {

    it('should register an event handler', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new EnviaConsoleLogHandler();

      eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]
      ).toMatchObject(eventHandler);
    });

    it('should unregister an event handler', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new EnviaConsoleLogHandler();

      eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

      eventDispatcher.unregister('CustomerAddressChangedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length
      ).toBe(0);
    });

    it('should unregister all event handlers', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new EnviaConsoleLogHandler();

      eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']
      ).toBeUndefined();
      expect(Object.keys(eventDispatcher.getEventHandlers).length).toBe(0);
    });
    it('should notify all event handlers', () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler = new EnviaConsoleLogHandler();
      const spyEventHandler = jest.spyOn(eventHandler, 'handle');

      eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]
      ).toMatchObject(eventHandler);

      const customer = new Customer('1', 'John Doe');
      const address = new Address('1', 123, 'Springfield', 'USA');

      customer.changeAddress(address);

      const customerAddressChangedEvent = new CustomerAddressChangedEvent({
        id: customer.id,
        name: customer.name,
        address: customer.address,
      });

      eventDispatcher.notify(customerAddressChangedEvent);
      expect(spyEventHandler).toHaveBeenCalledTimes(1);
    });
  });


});
