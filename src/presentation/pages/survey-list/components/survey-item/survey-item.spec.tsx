import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import SurveyItem from "./survey-item"
import React from "react"
import { mockSurveyModel } from "@/domain/test"
import { IconName } from "@/presentation/components"

describe('SurveyItem', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswear = true
    survey.date = new Date('2024-01-10T00:00:00')
    render(<SurveyItem survey={survey}/>)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2024')
  })
})
