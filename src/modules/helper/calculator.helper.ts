import Decimal from 'decimal.js';

export const calculator = {
  add(a: number, b: number): number {
    const x = new Decimal(a);
    const y = new Decimal(b);

    const z = x.add(y);

    return z.toDecimalPlaces(2).toNumber();
  },

  subtract(a: number, b: number): number {
    const x = new Decimal(a);
    const y = new Decimal(b);

    const z = x.minus(y);

    return z.toDecimalPlaces(2).toNumber();
  },

  multiply(a: number, b: number): number {
    const x = new Decimal(a);
    const y = new Decimal(b);

    const z = x.mul(y);

    return z.toDecimalPlaces(2).toNumber();
  },

  calculatePercent(number: number, percent: number) {
    const x = new Decimal(number);
    const y = new Decimal(percent);

    const z = y.dividedBy(100).mul(x);

    return z.toNumber();
  },

  toCent(number: number): number {
    const x = new Decimal(number);

    return x.toDecimalPlaces(2).mul(1000).toNumber();
  },

  fromCent(number: number) {
    const x = new Decimal(number);

    return x.dividedBy(1000).toDecimalPlaces(2).toNumber();
  },
};
