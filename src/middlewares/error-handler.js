/**
 * An express middleware to catch errors, logging them and send a proper response and status code to client side
 * @function
 * @param {Error} err Error Object
 * @param {Request} req Request Object
 * @param {Response} res Response Object
 * @param {NextFunction} next Function to transfer to next middleware
 * @returns {void}
 */
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