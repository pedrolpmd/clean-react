import { useContext } from "react"
import { ApiContext } from "@/presentation/contexts"
import { useHistory } from "react-router-dom"

type ResultType = () => void

export const useLogout = (): ResultType => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  return (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }
}
