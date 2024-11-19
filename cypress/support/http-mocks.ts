import faker from 'faker'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '1728000'
}
export const mockOptionsRequest = (url: string): void => {
  cy.intercept('OPTIONS', url, {
    statusCode: 200,
    headers
  })
}


export const mockPostRequest = (url: string, statusCode: number, body: any): void => {
  cy.intercept('POST', url, {
    statusCode,
    body,
    headers
  }).as('request')
}
