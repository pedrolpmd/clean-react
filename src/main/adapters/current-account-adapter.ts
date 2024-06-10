import { UnexpectedError } from "@/domain/errors"
import { AccountModel } from "@/domain/models"
import { makeLocalStorageAdapter } from "../factories/cache/local-storage-adapter"

export const setCurrentAccounAdapter = (account: AccountModel): void => {
  if(!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapter().set('account', account)
}
