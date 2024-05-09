import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import Signup from './signup'
import { EmailInUseError } from '@/domain/errors'

type SutParams = {
  validationError: string,
}

type SutTypes = {
  addAccountSpy: AddAccountSpy
  
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()

  validationStub.errorMessage = params?.validationError

  render(
    <Signup 
      validation={validationStub}
      addAccount={addAccountSpy}
    />
  )

  return {
    addAccountSpy
  }
}

const simulateValidSubmit = async (
  name = faker.name.findName(), 
  email = faker.internet.email(), 
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('name',name)
  Helper.populateField('email',email)
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
    Helper.testChildCount('error-wrap',0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test.each([['name'],['email'],['password'],['passwordConfirmation']])
    ('Should show %s error if Validation fails', (field) => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField(field)
    Helper.testStatusForField(field, validationError)
  })

  test.each([['name'],['email'],['password'],['passwordConfirmation']])
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
/*   

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit()
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    makeSut()
    const signup = screen.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  }) */

})