export type SurveyResultModel = {
  id: string
  question: string
  date: Date,
  answers: SurveyResultAnswerModel[]
}


export type SurveyResultAnswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
