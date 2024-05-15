import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

type Factory = {
  makeLogin: React.FC,
  makeSignup: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={factory.makeLogin} />
        <Route path="/signup" component={factory.makeSignup} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
