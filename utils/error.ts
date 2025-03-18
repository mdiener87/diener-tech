import { createError } from '#app';

export interface ErrorOptions {
  statusCode?: number;
  message?: string;
  fatal?: boolean;
  data?: any;
}

/**
 * Creates a standardized error object for the application
 * @param options Error options including status code, message, and additional data
 */
export const handleError = (options: ErrorOptions = {}) => {
  const {
    statusCode = 500,
    message = 'An unexpected error occurred',
    fatal = false,
    data = null
  } = options;

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', { statusCode, message, data });
  }

  // Create Nuxt error
  throw createError({
    statusCode,
    message,
    fatal,
    data
  });
};

/**
 * Creates a 404 Not Found error
 * @param message Custom error message (optional)
 */
export const notFound = (message = 'Page not found') => {
  return handleError({
    statusCode: 404,
    message,
    fatal: false
  });
};

/**
 * Creates a 403 Forbidden error
 * @param message Custom error message (optional)
 */
export const forbidden = (message = 'Access denied') => {
  return handleError({
    statusCode: 403,
    message,
    fatal: false
  });
};

/**
 * Creates a 500 Server error
 * @param message Custom error message (optional)
 * @param error Original error object (optional)
 */
export const serverError = (message = 'Server error', error?: Error) => {
  return handleError({
    statusCode: 500,
    message,
    fatal: true,
    data: process.env.NODE_ENV === 'development' ? error : null
  });
};

/**
 * Creates a 400 Bad Request error
 * @param message Custom error message (optional)
 */
export const badRequest = (message = 'Bad request') => {
  return handleError({
    statusCode: 400,
    message,
    fatal: false
  });
};

/**
 * Creates a 401 Unauthorized error
 * @param message Custom error message (optional)
 */
export const unauthorized = (message = 'Unauthorized') => {
  return handleError({
    statusCode: 401,
    message,
    fatal: false
  });
}; 