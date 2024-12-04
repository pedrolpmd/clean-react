
import { SurveyResultAnswerModel } from "@/domain/models"
import React from "react"
import Styles from './answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }) => {
  const activeClassname = answer.isCurrentAccountAnswer ? Styles.active : ''
  return (
    <li
      data-testid='answer-wrap'
      className={[Styles.answerWrap, activeClassname].join(' ')}
    >
      {answer.image && <img data-testid='image' src={answer.image} />}
      <span data-testid='answer' className={Styles.answer}>{answer.answer}</span>
      <span data-testid='percent' className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
