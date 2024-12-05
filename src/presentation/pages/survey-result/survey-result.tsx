
import React, { useEffect, useState } from "react"
import Styles from './survey-result-styles.scss'
import Header from "@/presentation/components/header/header"
import Footer from "@/presentation/components/footer/footer"
import { Error, Loading } from "@/presentation/components"
import { LoadSurveyResult } from "@/domain/usecases/load-survey-result"
import { useErrorHandler } from "@/presentation/hooks"
import { SurveyResultContext, SurveyResultData } from "./components"
import { SaveSurveyResult } from "@/domain/usecases"

type Props = {
  loadSurveyResult: LoadSurveyResult,
  saveSurveyResult: SaveSurveyResult
}
const SurveyList: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }))
  })

  const reload = (): void => setState(old => ({
    isLoading: false,
    surveyResult: null,
    error: '',
    reload: !old.reload
  }))

  const onAnswer = (answer: string): void => {
    setState(old => (
      {
        ...old,
        isLoading: true
      }))

    saveSurveyResult.save({ answer })
      .then()
      .catch()
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>

        <div data-testid='survey-result' className={Styles.contentWrap}>
          {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error data-testid='error' error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>

      <Footer />
    </div>
  )
}

export default SurveyList
