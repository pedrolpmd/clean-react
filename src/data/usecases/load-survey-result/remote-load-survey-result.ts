import { HttpGetClient } from '@/data/protocols/http';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetCleint: HttpGetClient
  ) {

  }
  async load(): Promise<void> {
    await this.httpGetCleint.get({ url: this.url })
  }
}
