import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import Header from "./header"
import React from "react"
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AccountModel } from "@/domain/models"
import { mockAccountModel } from "@/domain/test"
import { RecoilRoot } from "recoil";
import { currentAccountState } from "../atoms/atoms";

type SutType = {
  history: MemoryHistory,
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()

  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  }

  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <Header />
      </Router>
    </RecoilRoot>
  )

  return {
    history,
    setCurrentAccountMock
  }
}

describe('Header component', () => {
  test('Should call setCurrentAccount  with undefined', () => {

    const { history, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
