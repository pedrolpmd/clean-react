import { AccountModel } from "@/domain/models"
import { makeLocalStorageAdapter } from "../factories/cache/local-storage-adapter"

export const setCurrentAccounAdapter = (account: AccountModel): void => {
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccounAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get('account')
}
