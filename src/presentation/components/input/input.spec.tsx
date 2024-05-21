import React from "react";
import { render, screen } from '@testing-library/react'
import Input from './input'
import { FormContext } from "@/presentation/contexts";

const makeSut = (): void => {
  render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name="test-input" />
    </FormContext.Provider >
  )
}

describe('Input component', () => {
  test('Should begin with readonly', () => {
    makeSut()
    const input = screen.getByTestId('test-input') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
