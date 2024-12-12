import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import SurveyItem from "./item"
import React from "react"
import { mockSurveyModel } from "@/domain/test"
import { IconName } from "@/presentation/components"
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/']})

  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>
  )

  return { history }
}

describe('SurveyItem', () => {

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didanswer: true,
      date: new Date('2024-01-10T00:00:00')
    })

    makeSut(survey)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2024')
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didanswer: true,
      date: new Date('2024-05-03T00:00:00')
    })

    makeSut(survey)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2024')
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('Should go to SurveyResult', () => {
    const survey = Object.assign(mockSurveyModel())

    const { history } = makeSut(survey)

    fireEvent.click(screen.getByTestId('link'))
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
