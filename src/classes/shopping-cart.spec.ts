import { FiftyPercentDiscount } from './discount';
import { CartItem } from './interfaces/cart-item';
import { ShoppingCart } from './shopping-cart';

const createSut = () => {
  // discount mock
  class MockDiscount extends FiftyPercentDiscount {}
  const mockDiscount = new MockDiscount();
  const sut = new ShoppingCart(mockDiscount);
  return { sut, mockDiscount };
};

const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(
      public name: string,
      public price: number,
    ) {}
  }

  return new CartItemMock(name, price);
};

const createSutWithProducts = () => {
  const { sut, mockDiscount } = createSut();
  const cartItem = createCartItem('Mock', 100);

  sut.addItem(cartItem);

  return { sut, mockDiscount };
};

describe('ShoppingCart', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should be an empty cart when no product is added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('Should add product and have a cart item', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(1);
  });

  it('Should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts();
    expect(sut.total()).toBe(100);
    expect(sut.totalWithDiscount()).toBe(50);
  });

  it('Should clear cart', () => {
    const { sut } = createSutWithProducts();
    sut.clear();
    expect(sut.items.length).toBe(0);
  });

  it('Should remove products', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(1);
    sut.removeItem(0); // remove is based on index
    expect(sut.isEmpty()).toBe(true);
  });
});
