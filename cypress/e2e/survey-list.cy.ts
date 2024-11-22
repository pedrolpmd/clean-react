import faker from 'faker'
import { setLocalStorageItem, testInputStatus } from "../support/form-helper"
import { mockPostRequest } from '../support/http-mocks'

describe(('Survey List'), () => {
  beforeEach(() => {
    setLocalStorageItem('account', { accessToken: faker.random.uuid(), name: faker.name.findName()})
    cy.visit('')
  })

  it('Should present error on UnexpectedError', () => {
    mockPostRequest('/api/surveys', 400, {
      error: faker.random.words()
    })
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })

})
