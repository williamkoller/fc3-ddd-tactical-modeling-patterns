import { Address } from './address';

export class Customer {
  _id: string;
  _name: string;
  _address!: Address;
  _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
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

  changeName(name: string) {
    this._name = name;
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

  addAddress(address: Address) {
    this._address = address;
  }
}
