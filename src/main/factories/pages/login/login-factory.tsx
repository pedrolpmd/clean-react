import React from "react";
import { makeLoginValidation } from "./login-validation-factory";
import { makeRemoteAuthentication } from "@/main/factories/use-cases/authentication/remote-authentication-factory";
import { Login } from '@/presentation/pages'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}