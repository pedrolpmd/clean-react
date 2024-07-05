import { SurveyModel } from "@/domain/models"
import { LoadSurveyList } from "@/domain/usecases"
import Footer from "@/presentation/components/footer/footer"
import Header from "@/presentation/components/header/header"
import { SurveyContext, SurveyListItem } from "@/presentation/pages/survey-list/components"
import React, { useEffect, useState } from "react"
import Styles from './survey-list-styles.scss'
import Error from "./components/error/error"

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })
  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(error => setState({ ...state, error: error.message }))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {
            state.error
              ? <Error />
              : <SurveyListItem />
          }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
