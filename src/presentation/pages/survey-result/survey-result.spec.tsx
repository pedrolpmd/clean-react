import { LoadSurveyResultSpy, mockAccountModel } from "@/domain/test"
import { ApiContext } from "@/presentation/contexts"
import { SurveyResult } from "@/presentation/pages"
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from "@testing-library/react"
import React from "react"

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}>
      <SurveyResult loadSurveyResult={loadSurveyResultSpy}/>
    </ApiContext.Provider>
  )

  return {
    loadSurveyResultSpy
  }
}
describe('SurveyResult component', () => {
  test('Should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  test('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })
})
