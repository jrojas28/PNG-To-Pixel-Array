/**
 * @file Core PNG-To-Pixel-Array related routes.
 */
 import {
    ERRORS,
    throwError
} from "../util/errors";
import { fetchPngFromUrl } from "../util/pngjs";


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
    const {query: { url }} =  req;
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