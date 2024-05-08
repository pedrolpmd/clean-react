import { fireEvent, screen } from "@testing-library/react"
import faker from 'faker'

export const testChildCount = (fieldName: string, count: number): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}