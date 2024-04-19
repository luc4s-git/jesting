import { Messaging } from './messaging';

// DRY
const createSut = () => new Messaging();

describe('Messaging', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should return undefined', () => {
    const sut = createSut();
    expect(sut.sendMessage('argument coming from jest.')).toBeUndefined();
  });

  it('Should call console.log once.', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('this message is coming from jest.');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('Should call console.log with ("Mensagem enviada:", msg) argument', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('this message is coming from jest.');
    expect(consoleSpy).toHaveBeenCalledWith('Mensagem enviada:', 'this message is coming from jest.');
  });
});
