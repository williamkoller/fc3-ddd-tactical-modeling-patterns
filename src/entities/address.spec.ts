import { Address } from './address';

describe(Address.name, () => {
  const address = new Address('1', 123, 'Springfield', 'USA');

  it('should be defined', () => {
    expect(address).toBeDefined();
  });

  it('should throw error when street is empty', () => {
    expect(() => new Address('', 123, 'Springfield', 'USA')).toThrow(
      'Street is required'
    );
  });

  it('should throw error when number is empty', () => {
    expect(() => new Address('1', 0, 'Springfield', 'USA')).toThrow(
      'Number is required'
    );
  });

  it('should throw error when number must be greater than zero', () => {
    expect(() => new Address('1', -1, 'Springfield', 'USA')).toThrow(
      'Number is required and number must be greater than zero'
    );
  });

  it('should throw error when zip is empty', () => {
    expect(() => new Address('1', 123, '', 'USA')).toThrow('Zip is required');
  });

  it('should throw error when city is empty', () => {
    expect(() => new Address('1', 123, 'Springfield', '')).toThrow(
      'City is required'
    );
  });

  it('should return fullAddress', () => {
    const fullAddress = address.fullAddress();
    expect(fullAddress).toBe('1 123, Springfield USA');
  });

  it('should return correct address', () => {
    expect(address.street).toBe('1');
    expect(address.number).toBe(123);
    expect(address.zip).toBe('Springfield');
    expect(address.city).toBe('USA');
  });
});
