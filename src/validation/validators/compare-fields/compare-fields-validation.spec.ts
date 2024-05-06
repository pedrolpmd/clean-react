import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors';

const makeSut = (value: string, valueToCompare: string): CompareFieldsValidation => 
  new CompareFieldsValidation(value, valueToCompare);

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word(), faker.random.word())
    const error = sut.validate(faker.random.word(), )
    expect(error).toEqual(new InvalidFieldError())
  })
})
