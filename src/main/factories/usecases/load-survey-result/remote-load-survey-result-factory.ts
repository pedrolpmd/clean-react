import { RemoteLoadSurveyResult } from "@/data/usecases/load-survey-result/remote-load-survey-result";
import { LoadSurveyResult } from "@/domain/usecases";
import { makeApiUrl } from "@/main/factories/http";
import { makeAuthorizeHttpClientDecorator } from "@/main/factories/decorators";

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator())
}
