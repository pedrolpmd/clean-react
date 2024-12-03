
import { Calendar } from "@/presentation/components"
import React from "react"
import FlipMove from "react-flip-move"
import Styles from './survey-result-styles.scss'
import { useHistory } from "react-router-dom"
import { LoadSurveyResult } from "@/domain/usecases"

type Props = {
  surveyResult: LoadSurveyResult.Model
}
const Result: React.FC<Props> = ({ surveyResult }) => {
  const { goBack } = useHistory()

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid={'question'}>{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid='answers' className={Styles.answerList}>
        {
          surveyResult.answers.map(answer =>
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
      <button className={Styles.button} data-testid='back-button' onClick={goBack}>Voltar</button>
    </>
  )
}

export default Result
