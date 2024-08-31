import { ServerError } from "../errors/index.js";

export const badRequest = (error) => ({
  statusCode: 400,
  body: error,
});
export const unauthorizer = (error) => ({
  statusCode: 401,
  body: error,
});
export const serverError = (error) => ({
  statusCode: 500,
  body: new ServerError(error),
});

export const ok = (data) => ({
  statusCode: 200,
  body: data,
});
