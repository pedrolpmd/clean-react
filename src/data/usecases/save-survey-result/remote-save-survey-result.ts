import { RemoteSurveyResultModel } from '@/data/models';
import { HttpClient } from '@/data/protocols/http';
import { SaveSurveyResult } from '@/domain/usecases';
import { LoadSurveyResult } from '@/domain/usecases';

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {

  }
  async save(params: SaveSurveyResult.Params): Promise<LoadSurveyResult.Model> {
    await this.httpGetClient.request({ url: this.url, method: 'put' })
    
    return null

  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}

