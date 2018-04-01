/**
 * @file Error handler middleware and objects.
 */

import Logger from '../util/logger';
const logger = Logger('Error');  

export const ERRORS = {
    E001: {
        errorCode: 1,
        description: "an URL parameter is required",
        status: 400,
    },
    E002: {
        errorCode: 2,
        description: "Content type not accepted",
        status: 400,
    },
    E003: {
        errorCode: 1,
        description: "An image in base64 is required",
        status: 400,
    },
}

/**
 * Given an error object from this file, returns an error that will
 * later be taken into Express to be used with the middleware.
 * @param {Object} e an Error object from this file. 
 */
export const throwError = (e) => {
    const error = new Error();
    error.errorData = e;
    return e;
}

/**
 * Returns a JSON response containing an error.
 * 
 * @param {Object} err The error to report to the end user.
 * @param {Express.Request} req The Request object from express.
 * @param {Express.Response} res The Response object from express.
 * @param {Function} next
 * @returns {Error}
 */
export default (err, req, res, next) => {
    const error = {
        errorCode: 0,
        description: 'An unexpected error happened.',
        status: 400,
        ...err,
    };

    logger.error('There was an error in the application.', error);

    res.status(error.status).json(error);
};