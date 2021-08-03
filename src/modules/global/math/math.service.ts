import { Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';

@Injectable()
export class MathService {
  public add(a: number, b: number): number {
    const x = new Decimal(a);
    const y = new Decimal(b);

    const z = x.add(y);

    return z.toNumber();
  }

  public subtract(a: number, b: number): number {
    const x = new Decimal(a);
    const y = new Decimal(b);

    const z = x.minus(y);

    return z.toNumber();
  }

  public multiply(a: number, b: number): number {
    const x = new Decimal(a);
    const y = new Decimal(b);

    const z = x.mul(y);

    return z.toNumber();
  }

  public calculatePercent(number: number, percent: number) {
    const x = new Decimal(number);
    const y = new Decimal(percent);

    const z = y.dividedBy(100).mul(x);

    return z.toNumber();
  }
}
