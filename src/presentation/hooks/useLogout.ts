import { currentAccountState } from "@/presentation/components";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";

type ResultType = () => void

export const useLogout = (): ResultType => {
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const history = useHistory()

  return (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }
}
