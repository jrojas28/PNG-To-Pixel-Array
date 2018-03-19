/**
 * @file PNGJS Utility methods
 */

import request from 'request';
import { PNG } from 'pngjs';
import { throwError, ERRORS } from './errors';

import Logger from './logger';
const logger = Logger('PNGJS.Logger');  


const ACCEPTED_DATA_TYPES = [
    'image/png',
];
 /**
  * @param {String} imageUrl the URL to fetch the png from.
  * @returns {Promise} a promise to read the stream and return a PngJS object.
  */
export const fetchPngFromUrl = imageUrl => new Promise((resolve, reject) => {
    request
        .get(imageUrl)
        .on('error', reject)
        .on('response', (response) => {
            if (!ACCEPTED_DATA_TYPES.includes(response.headers['content-type'])) {
                reject(throwError(ERRORS.E002));
            }
        })
        .pipe(new PNG({
            filterType: 4
        }))
        .on('parsed', function() {
            logger.info('fetchPngFromUrl :: Parsed here.', {
                height: this.height,
                width: this.width,
            });

            resolve();
        });
});