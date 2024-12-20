import { RemoteSurveyResultModel } from '@/data/models';
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { SaveSurveyResult } from '@/domain/usecases';
import { LoadSurveyResult } from '@/domain/usecases';

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {

  }
  async save(params: SaveSurveyResult.Params): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.request({ url: this.url, method: 'put', body: params })
    const remoteSurveyResult = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return Object.assign({}, remoteSurveyResult, { date: new Date(remoteSurveyResult.date) });
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}

