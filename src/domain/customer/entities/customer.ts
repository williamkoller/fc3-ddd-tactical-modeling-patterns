import { EventDispatcher } from '../../shared/events/event-dispatcher';
import { CustomerAddressChangedEvent } from '../events/customer-address-changed-event';
import { Address } from '../value-objects/address';

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private eventDispatcher: EventDispatcher;

  constructor(
    id: string,
    name: string,
    address?: Address,
    active?: boolean,
    rewardPoints?: number
  ) {
    this._id = id;
    this._name = name;
    if (address) this._address = address;
    if (active) this._active = active;
    if (rewardPoints) this._rewardPoints = rewardPoints;
    this.eventDispatcher = new EventDispatcher();
    this.eventDispatcher.notify(new CustomerAddressChangedEvent(this));
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get active(): boolean {
    return this._active;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (!this._address)
      throw new Error('Address is mandatory to activate a customer');
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  validate() {
    if (this._id.length === 0) throw new Error('Id is required');
    if (this._name.length === 0) throw new Error('Name is required');
  }

  changeAddress(address: Address) {
    this._address = address;
    this.eventDispatcher.notify(new CustomerAddressChangedEvent(this));
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
