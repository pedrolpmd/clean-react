import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import Signup from './signup'
import { createMemoryHistory } from 'history'
import { EmailInUseError } from '@/domain/errors'
import { Router } from 'react-router-dom'
import { SaveAccessTokenMock } from '@/presentation/test/mock-save-access-token'

type SutParams = {
  validationError: string,
}

type SutTypes = {
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock

}

const history = createMemoryHistory({ initialEntries: ['/signup']})
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  validationStub.errorMessage = params?.validationError

  render(
    <Router history={history}>
      <Signup
        validation={validationStub}
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )

  return {
    addAccountSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Signup Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.word()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test.each([['name'], ['email'], ['password'], ['passwordConfirmation']])
    ('Should show %s error if Validation fails', (field) => {
      const validationError = faker.random.words()
      makeSut({ validationError })
      Helper.populateField(field)
      Helper.testStatusForField(field, validationError)
    })

  test.each([['name'], ['email'], ['password'], ['passwordConfirmation']])
    ('Should show valid %s state if Validation succeeds', (field) => {
      makeSut()
      Helper.populateField(field)
      Helper.testStatusForField(field)
    })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const passwordConfirmation = password
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation
    })
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    Helper.testElementText('main-error', error.message)
    Helper.testChildCount('error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { addAccountSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit()
    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken failes', async () => {
    const { saveAccessTokenMock } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    Helper.testElementText('main-error', error.message)
    Helper.testChildCount('error-wrap', 1)
  })

  test('Should go to login page', async () => {
    makeSut()
    const login = screen.getByTestId('login-link')
    fireEvent.click(login)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})