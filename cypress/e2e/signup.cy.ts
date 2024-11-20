import { testInputStatus } from "../support/form-helper"
import { mockOptionsRequest } from "../support/http-mocks"

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

})
