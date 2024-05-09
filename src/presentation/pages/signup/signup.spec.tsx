import { Helper, ValidationStub } from '@/presentation/test'
import { render } from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import Signup from './signup'

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): void => {
  const validationStub = new ValidationStub()

  validationStub.errorMessage = params?.validationError

  render(
    <Signup 
      validation={validationStub}
    />
  )
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

})