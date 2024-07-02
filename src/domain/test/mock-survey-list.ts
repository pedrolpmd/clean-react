import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel, SurveyModel } from '../models'
import faker from 'faker'

export const mockSurveyModel = (): SurveyModel => (
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    answers: [{
      answer: faker.random.words(5),
      image: faker.internet.url()
    }],
    date: new Date(),
    didAnswear: true
  }
)

export const mockSurveyListModel = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])

