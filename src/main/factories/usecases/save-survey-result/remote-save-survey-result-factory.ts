import { RemoteSaveSurveyResult } from "@/data/usecases/save-survey-result/remote-save-survey-result";
import { SaveSurveyResult } from "@/domain/usecases";
import { makeApiUrl } from "@/main/factories/http";
import { makeAuthorizeHttpClientDecorator } from "@/main/factories/decorators";

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator())
}
