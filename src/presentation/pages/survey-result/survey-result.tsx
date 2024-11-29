
import React, { useEffect, useState } from "react"
import Styles from './survey-result-styles.scss'
import Header from "@/presentation/components/header/header"
import Footer from "@/presentation/components/footer/footer"
import FlipMove from "react-flip-move"
import { Calendar, Error, Loading } from "@/presentation/components"
import { LoadSurveyResult } from "@/domain/usecases/load-survey-result"

type Props = {
  loadSurveyResult: LoadSurveyResult
}
const SurveyList: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then()
      .catch()
  },[])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid='survey-result' className={Styles.contentWrap}>
        {state.surveyResult &&
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Qual é seu framework favorito?</h2>
            </hgroup>
            <FlipMove className={Styles.answearList}>
              <li>
                <img src='https://delta-dev-software.fr/wp-content/uploads/2024/02/react-logo-freelogovectors.net_.png' />
                <span className={Styles.answear}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
            { state.isLoading && <Loading /> }
            { state.error && <Error error={state.error} reload={() => {}} /> }
          </>
        }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
