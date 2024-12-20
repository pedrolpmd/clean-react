import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators"
import { makeLoginValidation } from "./login-validation-factory"
import { ValidationBuilder } from "@/validation/builder/validation-builder"

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5),
    ]))
  })
})
