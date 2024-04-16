import React from "react";
import { render, screen } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): void => {
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name="test-input" />
    </Context.Provider >
  )
}

describe('Input component', () => {
  test('Should begin with readonly', () => {
    makeSut()
    const input = screen.getByTestId('test-input') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
