import { FieldValidationSpy } from '../../test';
import { ValidationComposite } from "./validation-composite";
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpyList: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpyList = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(fieldValidationSpyList)

  return {
    sut, fieldValidationSpyList
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpyList } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldValidationSpyList[0].error = new Error(errorMessage)
    fieldValidationSpyList[1].error = new Error(faker.random.words())
    const error = sut.validate(fieldName, faker.random.words())
    expect(error).toBe(errorMessage)
  })

  test('Should return falsy if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(faker.random.words(), faker.random.words())
    expect(error).toBeFalsy()
  })
})
