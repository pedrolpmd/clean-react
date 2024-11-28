import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result';

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetCleint: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {

  }
  async load(): Promise<LoadSurveyResult.Model> {
    const httpReponse = await this.httpGetCleint.get({ url: this.url })
    const remoteSurveyResult = httpReponse.body
    switch (httpReponse.statusCode) {
      case HttpStatusCode.ok:
        return Object.assign({}, remoteSurveyResult, { date: new Date(remoteSurveyResult.date )});
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }

  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    id: string
    question: string
    date: string,
    answears: Array<{
      image?: string
      answear: string
      count: number
      percent: number
      isCurrentAccountAnswer: boolean
    }>
  }
}
