import React from "react";
import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult, makeRemoteSaveSurveyResult } from "@/main/factories/usecases";
import { useParams } from "react-router-dom";

type SurveyResultParams = {
  id: string
}
export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<SurveyResultParams>()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  )
}
