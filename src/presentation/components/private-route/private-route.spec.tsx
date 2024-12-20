import { mockAccountModel } from "@/domain/test"
import { render } from '@testing-library/react'
import { MemoryHistory, createMemoryHistory } from 'history'
import React from "react"
import { Router } from 'react-router-dom'
import { RecoilRoot } from "recoil"
import { currentAccountState } from "../atoms/atoms"
import PrivateRoute from './private-route'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const mockedState = {
    setCurrentAccount: jest.fn(),
    getCurrentAccount: () => account
  }

  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </RecoilRoot>

  )

  return { history }
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render current component if token is not empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
