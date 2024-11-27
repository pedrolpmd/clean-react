export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
  export type Model = {
    id: string
    question: string
    date: Date,
    answears: Array<{
      image?: string
      answear: string
      count: number
      percent: number
    }>
  }
}
