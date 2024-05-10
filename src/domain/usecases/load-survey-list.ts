import { SurveyModel } from '../models'

export interface LoadSurvetList {
  loadAll: () => Promise<SurveyModel[]>
}
