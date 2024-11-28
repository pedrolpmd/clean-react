import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import SurveyItem from "./item"
import React from "react"
import { mockSurveyModel } from "@/domain/test"
import { IconName } from "@/presentation/components"

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey}/>)
}

describe('SurveyItem', () => {

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswear: true,
    })
   
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswear: true,
    })
   
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
