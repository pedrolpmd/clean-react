describe('template spec', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct values', () => {
    cy.getByTestId('email-status').should('have.attr','title','Campo obrigatório')
  })
})
