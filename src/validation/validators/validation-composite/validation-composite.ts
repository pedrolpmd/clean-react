import { Validation } from "@/presentation/protocols/validation"
import { FieldValidation } from "../../protocols/field-validation"

export class ValidationComposite implements Validation {
  private constructor (private readonly validators: FieldValidation[]){}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate(fieldName: string, input: object): string {
    const fieldValidators = this.validators.filter(v => v.field === fieldName)

    for (const validator of fieldValidators) {
      const error = validator.validate(input)
      if(error) {
        return error.message
      }
    }
  }
  
}
