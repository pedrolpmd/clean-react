import {  testInputStatus, testMainError, testUrl } from "../support/form-helper"
import { mockOptionsRequest, mockPostRequest } from "../support/http-mocks"
import faker from 'faker'

export const simulateValidSubmit = (): void => {
  cy.getByTestId('name').focus().type(faker.name.findName())
  testInputStatus('name')

  cy.getByTestId('email').focus().type(faker.internet.email())

  testInputStatus('email')

  const password = faker.random.alphaNumeric(5)
  cy.getByTestId('password').focus().type(password)
  testInputStatus('password')

  cy.getByTestId('passwordConfirmation').focus().type(password)
  testInputStatus('passwordConfirmation')

  cy.getByTestId('submit').click()
}


describe('login', () => {

  beforeEach(() => {
    cy.visit('signup')
    mockOptionsRequest('/api/signup')
  })

  it('Should load with correct values', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('name').should('have.attr', 'readOnly')
    testInputStatus('name', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    testInputStatus('passwordConfirmation', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {

    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('name', 'Valor inválido')

    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'Valor inválido')

    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
    testInputStatus('passwordConfirmation', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    simulateValidSubmit()

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present emailInUserError on 403', () => {
    mockPostRequest('/api/signup', 403, {
      error: faker.random.words()
    })

    simulateValidSubmit()

    testMainError('Este email já está em uso')
    testUrl('/signup')
  })

})
