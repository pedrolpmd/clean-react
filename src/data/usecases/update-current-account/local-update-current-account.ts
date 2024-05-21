import { SetStorage } from "@/data/protocols/cache/set-storage";
import { AccountModel } from "@/domain/models";
import { UpdateCurrentAccount } from "@/domain/usecases/update-current-account";

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(private readonly setStorage: SetStorage) { }

  save(account: AccountModel): void {
    this.setStorage.set('account', account)
  }
}
