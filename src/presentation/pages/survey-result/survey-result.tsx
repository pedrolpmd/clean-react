
import React from "react"
import Styles from './survey-result-styles.scss'
import Header from "@/presentation/components/header/header"
import Footer from "@/presentation/components/footer/footer"
import FlipMove from "react-flip-move"
import { Loading } from "@/presentation/components"

const SurveyList: React.FC = ({ }) => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual é seu framework favorito?</h2>
        <FlipMove className={Styles.answearList}>
          <li>
            <img src='https://delta-dev-software.fr/wp-content/uploads/2024/02/react-logo-freelogovectors.net_.png' />
            <span className={Styles.answear}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li className={Styles.active}>
            <img src='https://delta-dev-software.fr/wp-content/uploads/2024/02/react-logo-freelogovectors.net_.png' />
            <span className={Styles.answear}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li>
            <img src='https://delta-dev-software.fr/wp-content/uploads/2024/02/react-logo-freelogovectors.net_.png' />
            <span className={Styles.answear}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        <Loading />
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
