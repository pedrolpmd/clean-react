import { LoadSurveyList } from "@/domain/usecases"
import Footer from "@/presentation/components/footer/footer"
import Header from "@/presentation/components/header/header"
import { useErrorHandler } from "@/presentation/hooks"
import { SurveyListItem, surveyListState } from "@/presentation/pages/survey-list/components"
import React, { useEffect } from "react"
import Styles from './survey-list-styles.scss'
import { Error } from "@/presentation/components"
import { useRecoilState } from "recoil"

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })

  const [state, setState] = useRecoilState(surveyListState)

  const reload = (): void => setState(old => ({ surveys: [], error: '', reload: !old.reload }))

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(old => ({ ...old, surveys })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {
          state.error
            ? <Error error={state.error} reload={reload} />
            : <SurveyListItem surveys={state.surveys} />
        }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
