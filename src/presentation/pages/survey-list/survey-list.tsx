import { LoadSurveyList } from "@/domain/usecases"
import Footer from "@/presentation/components/footer/footer"
import Header from "@/presentation/components/header/header"
import { useErrorHandler } from "@/presentation/hooks"
import { SurveyContext, SurveyListItem } from "@/presentation/pages/survey-list/components"
import React, { useEffect, useState } from "react"
import Error from "./components/error/error"
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message })
  })

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(handleError)
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
