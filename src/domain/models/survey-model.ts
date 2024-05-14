export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswearModel[],
  date: Date,
  didAnswear: boolean
}


export type SurveyAnswearModel = {
  image?: string,
  answer: string
}