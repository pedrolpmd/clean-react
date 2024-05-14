import faker from 'faker'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpGetClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { SurveyModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
  return {
    sut, httpGetClientSpy
  }
}
describe('LoadSurveyList', () => {
  test('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test.each([
    [HttpStatusCode.forbidden],
    [HttpStatusCode.notFound],
    [HttpStatusCode.serverError]
  ])
    ('Should throw UnexpectedError if HttpGetClient returns %s', async (statusCode) => {
      const { sut, httpGetClientSpy } = makeSut()
      httpGetClientSpy.response = {
        statusCode: statusCode
      }
      const promise = sut.loadAll()
      await expect(promise).rejects.toThrow(new UnexpectedError())
    })
})