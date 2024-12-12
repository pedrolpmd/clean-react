import React from "react"
import Styles from './item-styles.scss'
import { Icon, IconName } from "@/presentation/components"
import { LoadSurveyList } from "@/domain/usecases"
import { Link } from "react-router-dom"

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon
          iconName={survey.didanswer ? IconName.thumbUp : IconName.thumbDown}
          className={Styles.iconWrap}
        />
        <time>
          <span data-testid='day' className={Styles.day}>
            {survey.date.getDate().toString().padStart(2, '0')}
          </span>
          <span data-testid='month' className={Styles.month}>
            {survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span data-testid='year' className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer>
        <Link data-testid='link' to={`/surveys/${survey.id}`}>
          Ver resultado
        </Link>
      </footer>
    </li>
  )
}

export default SurveyItem
