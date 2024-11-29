import { mockAccountModel } from "@/domain/test"
import { ApiContext } from "@/presentation/contexts"
import { SurveyResult } from "@/presentation/pages"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react"
import React from "react"

const makeSut = (): void => {
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}>  <SurveyResult />
    </ApiContext.Provider>

  )
}
describe('SurveyResult component', () => {
  test('Should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })
})
