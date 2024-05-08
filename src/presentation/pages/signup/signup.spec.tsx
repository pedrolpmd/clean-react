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
    Helper.testStatusForField('email', 'Campo obrigatório')
    Helper.testStatusForField('password', 'Campo obrigatório')
    Helper.testStatusForField('passwordConfirmation', 'Campo obrigatório')
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })
})