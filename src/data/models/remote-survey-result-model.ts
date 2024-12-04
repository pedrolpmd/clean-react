export type RemoteSurveyResultModel = {
  id: string
  question: string
  date: string,
  answers: RemoteSurveyResultAnswerModel[]
}

export type RemoteSurveyResultAnswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
