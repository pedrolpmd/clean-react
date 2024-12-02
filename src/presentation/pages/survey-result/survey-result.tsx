
import React, { useEffect, useState } from "react"
import Styles from './survey-result-styles.scss'
import Header from "@/presentation/components/header/header"
import Footer from "@/presentation/components/footer/footer"
import FlipMove from "react-flip-move"
import { Calendar, Error, Loading } from "@/presentation/components"
import { LoadSurveyResult } from "@/domain/usecases/load-survey-result"
import { useErrorHandler } from "@/presentation/hooks"

type Props = {
  loadSurveyResult: LoadSurveyResult
}
const SurveyList: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }))
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid='survey-result' className={Styles.contentWrap}>
        {state.surveyResult &&
          <>
            <hgroup>
              <Calendar date={state.surveyResult.date} className={Styles.calendarWrap} />
              <h2 data-testid={'question'}>{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid='answers' className={Styles.answerList}>
              {
                state.surveyResult.answers.map(answer =>
                  <li
                    data-testid='answer-wrap'
                    key={answer.answer}
                    className={answer.isCurrentAccountAnswer ? Styles.active : ''}
                  >
                    {answer.image && <img data-testid='image' src={answer.image} />}
                    <span data-testid='answer' className={Styles.answer}>{answer.answer}</span>
                    <span data-testid='percent' className={Styles.percent}>{answer.percent}%</span>
                  </li>
                )
              }

            </FlipMove>
            <button>Voltar</button>
          </>
        }
        {state.isLoading && <Loading />}
        {state.error && <Error data-testid='error' error={state.error} reload={() => { }} />}

      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
