
import { SurveyResultAnswerModel } from "@/domain/models"
import React, { useContext } from "react"
import Styles from './answer-styles.scss'
import { SurveyResultContext } from "@/presentation/pages/survey-result/components"

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }) => {
  const activeClassname = answer.isCurrentAccountAnswer ? Styles.active : ''
  const { onAnswer } = useContext(SurveyResultContext)
  const answerClick = (event: React.MouseEvent): void => {
    if(event.currentTarget.classList.contains(Styles.active)) {
      return
    }

    onAnswer(answer.answer)
  }
  return (
    <li
      data-testid='answer-wrap'
      className={[Styles.answerWrap, activeClassname].join(' ')}
      onClick={answerClick}
    >
      {answer.image && <img data-testid='image' src={answer.image} />}
      <span data-testid='answer' className={Styles.answer}>{answer.answer}</span>
      <span data-testid='percent' className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
