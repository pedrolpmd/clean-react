import { InvalidFieldError } from "@/validation/errors"
import { MinLengthValidation } from "./min-length-validator"
import faker from 'faker'

const makeSut = (minLength: number): MinLengthValidation => 
  new MinLengthValidation(faker.database.column(), minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut(5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const sut = makeSut(5)
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
