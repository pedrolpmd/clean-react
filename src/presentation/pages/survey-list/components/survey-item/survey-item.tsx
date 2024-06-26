import React from "react"
import Styles from './survey-item-styles.scss'
import { Icon, IconName } from "@/presentation/components"

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon
          iconName={IconName.thumbDown}
          className={Styles.iconWrap}
        />
        <time>
          <span className={Styles.day}>31</span>
          <span className={Styles.month}>05</span>
          <span className={Styles.year}>2024</span>
        </time>
        <p>Qual é seu framework web favorito?</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}

export default SurveyItem
