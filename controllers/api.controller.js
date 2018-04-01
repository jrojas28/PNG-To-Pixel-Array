/**
 * @file Core PNG-To-Pixel-Array related routes.
 */
const isBase64 = require('is-base64');
import { fetchPngFromUrl, pngFromBase64 } from "../util/pngjs";
import {
    ERRORS,
    throwError
} from "../util/errors";


 /**
  * Given an Image URl in the req.query.url
  * parses it and returns an array containing
  * each pixel info.
  * 
  * @param {Express.Request} req Request param.
  * @param {Express.Response} res Response param.
  * @returns {Array<Object>} An array containing each pixel's information.
  */
 export const getImageFromUrl = async (req, res, next) => {
    const {body: { url }} =  req;
    if (!url) {
        next(throwError(ERRORS.E001));
        return;
    }
    try {
        const imageData = await fetchPngFromUrl(url);
        res.json({
            status: 'ok',
            data: imageData,
        });
    } catch (err) {
        next(err);
    }
 };

 /**
  * Given an Base64 body represeting an image
  * parses it and returns an array containing
  * each pixel info.
  * 
  * @param {Express.Request} req Request param.
  * @param {Express.Response} res Response param.
  * @returns {Array<Object>} An array containing each pixel's information.
  */
 export const getImageFromBase64 = async (req, res, next) => {
    const { body: { data } } = req;
    if (!data || !isBase64(data)) {
        next(throwError(ERRORS.E003));
        return;
    }

    try {
        const imageData = await pngFromBase64(data);
        res.json({
            status: 'ok',
            data: imageData,
        });
    } catch (err) {
        next(err);
    }
 };