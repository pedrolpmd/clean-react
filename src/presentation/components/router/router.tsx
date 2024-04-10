import React from 'react'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Router: React.FC = () => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <Login
            validation={validationStub}
            authentication={authenticationSpy}
          />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
