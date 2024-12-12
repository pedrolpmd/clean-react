import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup } from '@/main/factories/pages/signup/signup-factory'
import { getCurrentAccounAdapter, setCurrentAccounAdapter } from '../adapters/current-account-adapter'
import { PrivateRoute, currentAccountState } from '@/presentation/components'
import { makeSurveyList } from '../factories/pages/surveyList/survey-list-factory'
import { makeSurveyResult } from '../factories/pages/survey-result/survey-result-factory'
import { RecoilRoot } from 'recoil'
const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccounAdapter,
    getCurrentAccount: getCurrentAccounAdapter
  }

  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={makeLogin} />
          <Route path="/signup" component={makeSignup} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>

  )
}

export default Router
