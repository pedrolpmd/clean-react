import faker from 'faker'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpClientSpy, mockRemoteSurveyListModel } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Model[]>()
  const sut = new RemoteLoadSurveyList(url, httpClientSpy)
  return {
    sut, httpClientSpy
  }
}
describe('LoadSurveyList', () => {
  test('Should call HttpGetClient with correct url and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  test.each([
    [HttpStatusCode.notFound],
    [HttpStatusCode.serverError]
  ])
    ('Should throw UnexpectedError if HttpGetClient returns %s', async (statusCode) => {
      const { sut, httpClientSpy } = makeSut()
      httpClientSpy.response = {
        statusCode: statusCode
      }
      const promise = sut.loadAll()
      await expect(promise).rejects.toThrow(new UnexpectedError())
    })

  test('Should throw AccessDeniedError if HttpGetClient returns %s', async () => {
      const { sut, httpClientSpy } = makeSut()
      httpClientSpy.response = {
        statusCode: 403
      }
      const promise = sut.loadAll()
      await expect(promise).rejects.toThrow(new AccessDeniedError())
    })


  test('Should return RemoteLoadSurveyList.Model[] if HttpPostClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteSurveyListModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual([{
      id: httpResult[0].id,
      question: httpResult[0].question,
      didanswer: httpResult[0].didanswer,
      date: new Date(httpResult[0].date)
    },
    {
      id: httpResult[1].id,
      question: httpResult[1].question,
      didanswer: httpResult[1].didanswer,
      date: new Date(httpResult[1].date)
    },
    {
      id: httpResult[2].id,
      question: httpResult[2].question,
      didanswer: httpResult[2].didanswer,
      date: new Date(httpResult[2].date)
    }])
  })

  test('Should return empty list if HttpPostClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteSurveyListModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
      body: httpResult
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual([])
  })
})
