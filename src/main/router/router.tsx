import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup } from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/contexts'
import { getCurrentAccounAdapter, setCurrentAccounAdapter } from '../adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'
import { makeSurveyList } from '../factories/pages/surveyList/survey-list-factory'
import { makeSurveyResult } from '../factories/pages/survey-result/survey-result-factory'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
        setCurrentAccount: setCurrentAccounAdapter,
        getCurrentAccount: getCurrentAccounAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={makeLogin} />
          <Route path="/signup" component={makeSignup} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
