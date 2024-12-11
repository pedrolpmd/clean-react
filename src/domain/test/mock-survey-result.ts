import { LoadSurveyResult } from '@/domain/usecases';
import faker from 'faker';
import { SaveSurveyResult } from './../usecases/save-survey-result';

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(10)
})

export const mockSurveyResultModel = (): LoadSurveyResult.Model => (
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    date: faker.date.recent(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.words(10),
        count: faker.random.number(),
        percent: faker.random.number(100),
        isCurrentAccountAnswer: true
      },
      {
        answer: faker.random.words(9),
        count: faker.random.number(),
        percent: faker.random.number(100),
        isCurrentAccountAnswer: false
      }
    ]
  }
)

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult = mockSurveyResultModel()

  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount ++
    return this.surveyResult
  }

}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResult.Params
  surveyResult = mockSurveyResultModel()
  callsCount = 0

  async save(params: SaveSurveyResult.Params): Promise<LoadSurveyResult.Model> {
    this.params = params
    this.callsCount ++
    return this.surveyResult
  }
}
