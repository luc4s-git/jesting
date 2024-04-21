import { Discount, FiftyPercentDiscount, NoDiscount, TenPercentDiscount } from './discount';

const createSut = (className: new () => Discount) => new className();

describe('Discount', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should have no discount on price', () => {
    const price = 10.99;
    const sut = createSut(NoDiscount);
    expect(sut.calculate(price)).toBeCloseTo(price);
  });

  it('should apply fifty percent discount on price', () => {
    const price = 10;
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(price)).toBeCloseTo(5);
  });

  it('should apply ten percent discount on price', () => {
    const price = 10;
    const sut = createSut(TenPercentDiscount);
    expect(sut.calculate(price)).toBeCloseTo(9);
  });
});
