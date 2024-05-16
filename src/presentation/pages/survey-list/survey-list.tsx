import React from "react"
import Styles from './survey-list-styles.scss'
import Footer from "@/presentation/components/footer/footer"
import Header from "@/presentation/components/header/header"
import { Icon, IconName } from "@/presentation/components"

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
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
          <li>
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
          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList