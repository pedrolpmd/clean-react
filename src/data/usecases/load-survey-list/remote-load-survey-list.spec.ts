import faker from 'faker'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpGetClientSpy, mockRemoteSurveyListModel } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockSurveyListModel } from '@/domain/test'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>()
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

  test('Should throw AccessDeniedError if HttpGetClient returns %s', async () => {
      const { sut, httpGetClientSpy } = makeSut()
      httpGetClientSpy.response = {
        statusCode: 403
      }
      const promise = sut.loadAll()
      await expect(promise).rejects.toThrow(new AccessDeniedError())
    })


  test('Should return RemoteLoadSurveyList.Model[] if HttpPostClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockRemoteSurveyListModel()
    httpGetClientSpy.response = {
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
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockRemoteSurveyListModel()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
      body: httpResult
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual([])
  })
})
