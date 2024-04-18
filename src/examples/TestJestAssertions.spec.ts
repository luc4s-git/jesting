describe('Primitive Values', () => {
  it('should test hest assertions', () => {
    const number = 10;

    expect(number).toBe(10);
    expect(number).toEqual(10); // for testing objects we use toEqual instead of toBe because even if a object has exactly the same keys and values as another it will never be seen as equal uwu

    expect(number).not.toBe(null);
    expect(number).toBeTruthy();

    expect(number).toBeGreaterThan(9);
    expect(number).toBeLessThan(11);
    expect(number).toBeLessThanOrEqual(10);

    expect(number).toBeCloseTo(9.9995);
    expect(number).not.toBeNull();

    expect(number).toHaveProperty('toString'); // checks if the value has the property (method)
  });
});

describe('Objects', () => {
  it('Should test jest assertions with objects', () => {
    const person = { name: 'John', age: 30 };
    const anotherPerson = { ...person };

    // expect(person).toBe(anotherPerson); // not passed
    expect(person).toEqual(anotherPerson);
    expect(person).toHaveProperty('age', 30);

    expect(person.name).toBe('John');
  });
});
