
import React, { useEffect } from "react"
import Styles from './survey-result-styles.scss'
import Header from "@/presentation/components/header/header"
import Footer from "@/presentation/components/footer/footer"
import { Error, Loading } from "@/presentation/components"
import { LoadSurveyResult } from "@/domain/usecases/load-survey-result"
import { useErrorHandler } from "@/presentation/hooks"
import { SurveyResultData, surveyResultState, onSurveyAnswerState } from "./components"
import { SaveSurveyResult } from "@/domain/usecases"
import { useRecoilState, useSetRecoilState } from "recoil"

type Props = {
  loadSurveyResult: LoadSurveyResult,
  saveSurveyResult: SaveSurveyResult
}
const SurveyList: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useRecoilState(surveyResultState)

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }))
  })

  const reload = (): void => setState(old => ({
    isLoading: false,
    surveyResult: null,
    error: '',
    reload: !old.reload
  }))

  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  const onAnswer = (answer: string): void => {
    setState(old => (
      {
        ...old,
        isLoading: true
      }))

    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(old => ({ ...old, surveyResult, isLoading: false })))
      .catch(handleError)
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid='survey-result' className={Styles.contentWrap}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error data-testid='error' error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
