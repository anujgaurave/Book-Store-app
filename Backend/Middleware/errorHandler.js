export const errorHandler = (err, req, res, next) => {
  console.error(err); 


  let statusCode = 500;
  let message = 'Internal server error';

  if (err.message === 'Book already exists') {
    statusCode = 400;
    message = err.message;
  } else if (err.message === 'Book not found') {
    statusCode = 404;
    message = err.message;
  }

  res.status(statusCode).json({ message });
};
