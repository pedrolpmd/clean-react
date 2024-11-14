import faker from 'faker'

const baseUrl: string | null = Cypress.config().baseUrl

describe('template spec', () => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '1728000'
  }
  beforeEach(() => {
    cy.visit('login')
    cy.intercept('OPTIONS', '/api/login', {
      statusCode: 200,
      headers
    })
  })

  it('Should load with correct values', () => {
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.attr', 'readOnly')

    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo obrigatório')

    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.attr', 'readOnly')

    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present invalidCredentialsError on 401', () => {
    cy.intercept('OPTIONS', '/api/login', {
      statusCode: 200,
      headers
    })

    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: {
        error: faker.random.words()
      },
      headers
    })

    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('email')
      .should('not.have.attr', 'title')
    cy.getByTestId('email-label').should('not.have.attr', 'title')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password')
      .should('not.have.attr', 'title')
    cy.getByTestId('password-label').should('not.have.attr', 'title')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present unexpectedError on 400', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 400,
      body: {
        error: faker.random.words()
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '1728000'
      }
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}')

    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('OPTIONS', '/api/login', {
      statusCode: 200,
      headers
    })

    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: {
        accessToken: faker.random.uuid()
      },
      headers
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()

    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)

    cy.window().then(window => {
      const account = window.localStorage.getItem('account')
      if (account) {
        const accountObj = JSON.parse(account)
        assert.isOk(accountObj.accessToken)
      }
    })
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('OPTIONS', '/api/login', {
      statusCode: 200,
      headers
    })

    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: {
        accessToken: faker.random.uuid()
      },
      headers
    }).as('request')

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('OPTIONS', '/api/login', {
      statusCode: 200,
      headers
    })

    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: {
        accessToken: faker.random.uuid()
      },
      headers
    }).as('request')

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
