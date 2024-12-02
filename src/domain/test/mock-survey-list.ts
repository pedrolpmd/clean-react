import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'
import faker from 'faker'
import { LoadSurveyList } from '../usecases'

export const mockSurveyModel = (): LoadSurveyList.Model => (
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    date: new Date(),
    didanswer: true
  }
)

export const mockSurveyListModel = (): LoadSurveyList.Model[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])

