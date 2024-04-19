import { EnterpriseCustomer, IndividualCustomer } from './customer';

const createIndividualCustomer = (firstName: string, lastName: string, cpf: string): IndividualCustomer => new IndividualCustomer(firstName, lastName, cpf);
const createEnterpriseCustomer = (name: string, cnpj: string): EnterpriseCustomer => new EnterpriseCustomer(name, cnpj);

describe('Individual Customer', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should have firstName, lastName, cpf', () => {
    const sut = createIndividualCustomer('Jest', 'Test', '101.101.101-11');

    expect(sut).toHaveProperty('firstName', 'Jest');
    expect(sut).toHaveProperty('lastName', 'Test');
    expect(sut).toHaveProperty('cpf', '101.101.101-11');
  });

  it('Should have get methods for name and idn', () => {
    const sut = createIndividualCustomer('Jest', 'Test', 'XXX.XXX.XXX-ZZ');

    expect(sut.getName()).toBe('Jest Test');
    expect(sut.getIDN()).toBe('XXX.XXX.XXX-ZZ');
  });
});

describe('Enterprise Customer', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should have name and cnpj.', () => {
    const sut = createEnterpriseCustomer('Jest', 'XX.XXX.XXX/0001-ZZ');

    expect(sut).toHaveProperty('name', 'Jest');
    expect(sut).toHaveProperty('cnpj', 'XX.XXX.XXX/0001-ZZ');
  });

  it('Should have get methods for name and idn', () => {
    const sut = createEnterpriseCustomer('Jest', 'XX.XXX.XXX/0001-ZZ');

    expect(sut.getName()).toBe('Jest');
    expect(sut.getIDN()).toBe('XX.XXX.XXX/0001-ZZ');
  });
});
