import { CartItem } from './interfaces/cart-item';
import { CustomerOrder } from './interfaces/customer-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistenceProtocol } from './interfaces/persistence-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { Order } from './order';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem[]> {
    return [];
  }
  addItem(item: CartItem): void {}
  removeItem(index: number): void {}
  total(): number {
    return 0;
  }
  totalWithDiscount(): number {
    return 0;
  }
  isEmpty(): boolean {
    return false;
  }
  clear(): void {}
}

class MessagingMock implements MessagingProtocol {
  sendMessage(msg: string): void {}
}

class PersistenceMock implements PersistenceProtocol {
  saveOrder(): void {}
}

class CustomerMock implements CustomerOrder {
  getIDN(): string {
    return '';
  }
  getName(): string {
    return '';
  }
}

const makeSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistenceMock = new PersistenceMock();
  const customerMock = new CustomerMock();

  const order = new Order(shoppingCartMock, messagingMock, persistenceMock, customerMock);

  return { order, shoppingCartMock, persistenceMock, messagingMock };
};

describe('Order', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should not checkout if cart is empty', () => {
    const { order, shoppingCartMock } = makeSut();
    const spyOnShoppingCartMock = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(true);

    order.checkout();

    expect(spyOnShoppingCartMock).toHaveBeenCalledTimes(1);
    expect(order.orderStatus).toBe('open');
  });

  it('Should checkout if the cart has at least one item in it', () => {
    const { order } = makeSut();

    order.checkout();

    expect(order.orderStatus).toBe('closed');
  });

  it('Should send and email to the customer', () => {
    const { order, messagingMock } = makeSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');

    order.checkout();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('Should save the order if the cart has at least one item in it', () => {
    const { order, persistenceMock } = makeSut();
    const spyOnSave = jest.spyOn(persistenceMock, 'saveOrder');

    order.checkout();

    expect(spyOnSave).toHaveBeenCalledTimes(1);
  });

  it('Should clear the cart if the cart has at least one item in it', () => {
    const { order, shoppingCartMock } = makeSut();
    const spyOnClear = jest.spyOn(shoppingCartMock, 'clear');

    order.checkout();

    expect(spyOnClear).toHaveBeenCalledTimes(1);
  });

  it('Should log the clients name and IDN', () => {
    const { order } = makeSut();
    const spyOnConsole = jest.spyOn(console, 'log');

    order.checkout();

    expect(spyOnConsole).toHaveBeenCalledTimes(1);
  });
});
