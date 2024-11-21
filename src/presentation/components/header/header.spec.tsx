import { fireEvent, render, screen } from "@testing-library/react"
import Header from "./header"
import React from "react"
import ApiContext from "@/presentation/contexts/api/api-context"
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AccountModel } from "@/domain/models"

type SutType = {
  history: MemoryHistory,
  setCurrentAccountMock: (account: AccountModel) => void
}
const makeSut = (): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
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
})
