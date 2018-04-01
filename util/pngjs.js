/**
 * @file PNGJS Utility methods
 */
import stream from 'stream';
import rgbHex from 'rgb-hex';
import request from 'request';
import { PNG } from 'pngjs';
import base64Stream from 'base64-stream';
import { throwError, ERRORS } from './errors';
import Logger from './logger';

const logger = Logger('PNGJS.Logger');


const ACCEPTED_DATA_TYPES = [
  'image/png',
];

const imageToObject = (pngImage) => {
  const pngData = [];
  for (let y = 0; y < pngImage.height; y += 1) {
    for (let x = 0; x < pngImage.width; x += 1) {
      const pixelIndex = ((pngImage.width * y) + x) << 2;
      const r = pngImage.data[pixelIndex];
      const g = pngImage.data[pixelIndex + 1];
      const b = pngImage.data[pixelIndex + 2];
      // We could get alpha, but don't need it.
      const hex = rgbHex(r, g, b);
      pngData.push({
        r,
        g,
        b,
        hex,
      });
    }
  }

  return pngData;
};

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
    .pipe(new PNG())
    .on('parsed', function () {
      logger.info('fetchPngFromUrl :: Parsed here.', {
        height: this.height,
        width: this.width,
      });

      resolve(imageToObject(this));
    })
    .on('error', (err) => {
      logger.error('fetchPngFromUrl :: error.', err);
      reject(err);
    });
});

export const pngFromBase64 = base64 => new Promise((resolve, reject) => {
  const base64Input = new stream.Readable();
  base64Input.push(base64.split(',').pop());
  base64Input.push(null);

  base64Input
    .pipe(base64Stream.decode())
    .pipe(new PNG())
    .on('parsed', function () {
      logger.info('pngFromBase64 :: Image Parsed', {
        height: this.height,
        width: this.width,
      });

      resolve(imageToObject(this));
    })
    .on('error', (err) => {
      logger.error('pngFromBase64 :: error: ', err);
      reject(err);
    });
});
