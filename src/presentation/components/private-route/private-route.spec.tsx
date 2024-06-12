import React from "react"
import { render } from '@testing-library/react'
import PrivateRoute from './private-route'
import { Router } from 'react-router-dom'
import { MemoryHistory, createMemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <PrivateRoute />
    </Router>
  )

  return {history}
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/login')
  })
})
