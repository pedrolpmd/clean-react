import React from "react"
import Styles from './survey-list-styles.scss'
import Footer from "@/presentation/components/footer/footer"
import Header from "@/presentation/components/header/header"

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
