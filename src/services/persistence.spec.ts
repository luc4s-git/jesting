describe('Numbers', () => {
  it('should not return "2"', () => {
    const number = 1;
    expect(number).not.toBe(2);
  });
});

describe('Strings', () => {
  test('should return "John"', () => {
    const name = 'John';
    expect(name).toBe('John');
  });
});
