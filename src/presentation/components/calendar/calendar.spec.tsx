import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import React from "react"
import { Calendar } from "@/presentation/components"

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('Calendar', () => {

  test('Should render with correct values', () => {
    makeSut(new Date('2024-01-10T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2024')
  })

  test('Should render with correct values', () => {
    makeSut( new Date('2024-05-03T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2024')
  })
})
