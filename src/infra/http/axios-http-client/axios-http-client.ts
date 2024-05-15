import { HttpPostParams, HttpResponse, HttpPostClient, HttpGetParams, HttpGetClient } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any>, HttpGetClient {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse<any>

    try {
      axiosResponse = await axios.post(params.url, params.body)
      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      }
    } catch (error) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const axiosResponse = await axios.get(params.url)
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
