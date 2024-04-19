import { Product } from './product';

const createSut = (name: string, price: number) => new Product(name, price);

describe('Product', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should have properties name and price', () => {
    const sut = createSut('Jest', 10.5);
    expect(sut).toHaveProperty('name', 'Jest');
    expect(sut.price).toBeCloseTo(10.5);
  });
});
