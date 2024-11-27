import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { AccessDeniedError } from '@/domain/errors';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetCleint: HttpGetClient
  ) {

  }
  async load(): Promise<void> {
    const httpReponse = await this.httpGetCleint.get({ url: this.url })
    switch (httpReponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      default:
        throw new AccessDeniedError()
    }
    
  }
}
