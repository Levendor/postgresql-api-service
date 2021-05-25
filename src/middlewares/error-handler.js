export const errorHandler = (err, req, res, next) => {
  if (res.headerSent) next(err);

  const { method, originalUrl, body, params } = req;
  const { name, message, stack, statusCode = 500 } = err;
  const errorMessage = {
    method,
    originalUrl,
    body,
    params,
    name,
    message,
    statusCode
  }
  console.log('--------------->', errorMessage);
  res.status(statusCode).json({ ...errorMessage, stack })
}