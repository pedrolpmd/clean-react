import { RemoteLoadSurveyResult } from "../usecases"
import faker from 'faker'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => (
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    date: faker.date.recent().toISOString(),
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
      },
    ]
  }
)
