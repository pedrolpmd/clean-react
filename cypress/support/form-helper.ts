export const testInputStatus = (field: string, error?: string): void => {
  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')

  const attr = `${error ? '' : 'not.'}have.attr`
  cy.getByTestId(field).should(attr, 'title', error)
  cy.getByTestId(`${field}-label`).should(attr, 'title', error)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('error-wrap')
  .getByTestId('spinner').should('not.exist')
  .getByTestId('main-error').should('contain.text', error)
}

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}

const baseUrl: string | null = Cypress.config().baseUrl
export const testUrl = (path?: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}


export const testLocalStorageItem = (key: string, expectedObj: string): void => {
  cy.window().then(window => {
    const storedKey = window.localStorage.getItem(key)
    if (storedKey) {
      const keyObj = JSON.parse(storedKey)
      assert.isOk(keyObj[expectedObj])
    }
  })
}

export const setLocalStorageItem = (key: string, value: object): void => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
