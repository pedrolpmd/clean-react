import { RemoteLoadSurveyList } from "../usecases/load-survey-list/remote-load-survey-list"
import faker from 'faker'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => (
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    date: faker.date.recent().toISOString(),
    didAnswear: true
  }
)

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => ([
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel()
])
