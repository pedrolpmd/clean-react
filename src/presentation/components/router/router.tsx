import React from 'react'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Router: React.FC = () => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={() => (
          <Login
            validation={validationStub}
            authentication={authenticationSpy}
          />
        )} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
