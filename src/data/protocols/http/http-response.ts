export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  forbidden = 403,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
