import { mockAccountModel } from '@/domain/test'
import { setCurrentAccounAdapter } from './current-account-adapter'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccounAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })
})
