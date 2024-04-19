import { Persistence } from './persistence';

const createSut = () => new Persistence();

describe('Persistence', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return undefined', () => {
    // system under test
    const sut = createSut();
    expect(sut.saveOrder()).toBeUndefined();
  });

  it('should call console.log once', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');

    sut.saveOrder(); // needs to execute to call console.log

    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should call console.log once', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');

    sut.saveOrder(); // needs to execute to call console.log

    expect(consoleSpy).toHaveBeenCalledWith('Pedido salvo com sucesso...');
  });
});
