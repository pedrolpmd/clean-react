import { LoadSurveyList } from "@/domain/usecases"
import Footer from "@/presentation/components/footer/footer"
import Header from "@/presentation/components/header/header"
import { SurveyContext, SurveyListItem } from "@/presentation/pages/survey-list/components"
import { AccessDeniedError } from "@/domain/errors"
import React, { useContext, useEffect, useState } from "react"
import Styles from './survey-list-styles.scss'
import Error from "./components/error/error"
import { ApiContext } from "@/presentation/contexts"
import { useHistory } from "react-router-dom"

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: ''
  })

  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(error => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          history.replace('/login')
        } else {
          setState({ ...state, error: error.message })
        }
      }
      )
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
