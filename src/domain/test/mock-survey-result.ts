import faker from 'faker'
import { LoadSurveyResult } from '@/domain/usecases'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => (
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    date: faker.date.recent(),
    answears: [
      {
        image: faker.internet.url(),
        answear: faker.random.word(),
        count: faker.random.number(),
        percent: faker.random.number(100),
        isCurrentAccountAnswer: faker.random.boolean()
      },
      {
        answear: faker.random.word(),
        count: faker.random.number(),
        percent: faker.random.number(100),
        isCurrentAccountAnswer: faker.random.boolean()
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
