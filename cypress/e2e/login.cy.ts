import faker from 'faker'
import { testHttpCallsCount, testInputStatus, testLocalStorageItem, testMainError, testUrl } from '../support/form-helper'
import { mockOptionsRequest, mockPostRequest } from '../support/http-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit').click()
}

describe('login', () => {

  beforeEach(() => {
    cy.visit('login')
    mockOptionsRequest('/api/login')
  })

  it('Should load with correct values', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present invalidCredentialsError on 401', () => {
    mockPostRequest('/api/login', 401, {
      error: faker.random.words()
    })

    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())

    testInputStatus('email')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present unexpectedError on 400', () => {
    mockPostRequest('/api/login', 400, {
      error: faker.random.words()
    })

    simulateValidSubmit()

    testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    testUrl('/login')
  })

  it('Should save accessToken if valid credentials are provided', () => {
    mockPostRequest('/api/login', 200, {
      accessToken: faker.random.uuid()
    })

    simulateValidSubmit()

    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')

    testUrl('/')

    testLocalStorageItem('account','accessToken')
  })

  it('Should prevent multiple submits', () => {
    mockPostRequest('/api/login', 200, {
      accessToken: faker.random.uuid()
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    testHttpCallsCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    mockPostRequest('/api/login', 200, {
      accessToken: faker.random.uuid()
    })

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    testHttpCallsCount(0)
  })
})
