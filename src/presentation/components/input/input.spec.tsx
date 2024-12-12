import React from "react";
import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from '@/presentation/components'

const makeSut = (): void => {
  render(
    <Input name="test-input" state={{}} setState={null} />
  )
}

describe('Input component', () => {
  test('Should begin with readonly', () => {
    makeSut()
    const input = screen.getByTestId('test-input') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readonly on focus', () => {
    makeSut()
    const input = screen.getByTestId('test-input') as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })

  test('Should focus input on label click', () => {
    makeSut()
    const input = screen.getByTestId('test-input') as HTMLInputElement
    const label = screen.getByTestId('test-input-label')
    fireEvent.click(label)

    expect(document.activeElement).toBe(input)
  })
})
