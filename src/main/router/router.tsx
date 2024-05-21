import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup } from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={makeLogin} />
      <Route path="/signup" component={makeSignup} />
      <Route path="/" exact component={SurveyList} />
    </Switch>
  </BrowserRouter>
)

export default Router
