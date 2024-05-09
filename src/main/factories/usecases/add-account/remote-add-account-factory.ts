import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import { AddAccount, Authentication } from "@/domain/usecases";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory"
import { makeApiUrl } from "@/main/factories/http/api-url-factory";
import { RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
