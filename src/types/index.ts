export type SDKConfig = {
  apiKey: string;
  apiV1Url: string;
};

// Standard HTTP Error codes supported by Covalent API V1: https://www.covalenthq.com/docs/api/
type ERR_BAD_REQUEST = 400;
type ERR_UNAUTHORIZED = 401;
type ERR_NOT_FOUND = 404;
type ERR_TOO_MANY_REQUESTS = 429;
type SERVER_ERRORS = 500 | 502 | 503;

export type ERROR_CODE =
  | ERR_BAD_REQUEST
  | ERR_UNAUTHORIZED
  | ERR_NOT_FOUND
  | ERR_TOO_MANY_REQUESTS
  | SERVER_ERRORS;

export type ErrorResponse = {
  data: string; // @todo update this type incrementally, should be null if there is an error?
  error: boolean;
  error_code: ERROR_CODE;
};
