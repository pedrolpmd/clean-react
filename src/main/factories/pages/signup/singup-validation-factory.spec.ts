import { ValidationComposite } from "@/validation/validators"
import { ValidationBuilder as Builder } from "@/validation/builder/validation-builder"
import { makeSignupValidation } from "./signup-validation-factory"

describe('SignupValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().min(5).build(),
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(5).build(),
      ...Builder.field('passwordConfirmation').required().min(5).build(),
    ]))
  })
})
