import request from 'supertest';
import { expect } from 'chai';
import app from '../../app';
import { ERRORS } from '../../util/errors';
import { skybluePixelData, nonPngBase64, skyblueBase64WithMime, skyblueBase64WithoutMime } from '../__fixtures__/image.fixtures';
import { skyblueBoxUrl, nonPngImageUrl } from '../__fixtures__/url.fixtures';

describe('API Route Tests', () => {
  describe('/api/img-from-url', () => {
    const url = '/api/img-from-url';

    it('should throw error if no url is provided in the body', (done) => {
      request(app)
        .post(url)
        .expect(400, ERRORS.E001, done);
    });

    it('should be successful with a PNG url', (done) => {
      request(app)
        .post(url)
        .send({
          url: skyblueBoxUrl,
        })
        .set('Content-Type', 'application/json')
        .expect(200, done);
    });

    it('should return SkyBlueBox data from the URL', (done) => {
      request(app)
        .post(url)
        .send({
          url: skyblueBoxUrl,
        })
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          const { body: { data } } = res;
          for (let i = 0; i < data.length; i += 1) {
            const row = data[i];

            for (let j = 0; j < row.length; j += 1) {
              const pixel = data[i][j];
              expect(pixel.r).to.equal(skybluePixelData.r);
              expect(pixel.g).to.equal(skybluePixelData.g);
              expect(pixel.b).to.equal(skybluePixelData.b);
              expect(pixel.hex).to.equal(skybluePixelData.hex);
              expect(pixel.isTransparent).to.equal(skybluePixelData.isTransparent);
            }
          }

          done();
        });
    });

    it('should throw an error if image is not png', (done) => {
      request(app)
        .post(url)
        .send({
          url: nonPngImageUrl,
        })
        .expect(400, ERRORS.E002, done);
    });
  });

  describe('/api/img-from-base64', () => {
    const url = '/api/img-from-base64';
    it('should throw and error if data is not present', (done) => {
      request(app)
        .post(url)
        .expect(400, ERRORS.E003, done);
    });

    it('should throw an error if data is not base64', (done) => {
      request(app)
        .post(url)
        .send({ data: 'non-base64' })
        .expect(400, ERRORS.E003, done);
    });

    it('should throw an error if data is base64 but not a png', (done) => {
      request(app)
        .post(url)
        .send({ data: nonPngBase64 })
        .expect(400, ERRORS.E002, done);
    });

    it('should work with a base64 png with mime type', (done) => {
      request(app)
        .post(url)
        .send({ data: skyblueBase64WithMime })
        .expect(200, done);
    });

    it('should work with a base64 png without mime type', (done) => {
      request(app)
        .post(url)
        .send({ data: skyblueBase64WithoutMime })
        .expect(200, done);
    });

    it('should return SkyBlueBox from base64 png image', (done) => {
      request(app)
        .post(url)
        .send({ data: skyblueBase64WithMime })
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          const { body: { data } } = res;
          for (let i = 0; i < data.length; i += 1) {
            const row = data[i];

            for (let j = 0; j < row.length; j += 1) {
              const pixel = data[i][j];
              expect(pixel.r).to.equal(skybluePixelData.r);
              expect(pixel.g).to.equal(skybluePixelData.g);
              expect(pixel.b).to.equal(skybluePixelData.b);
              expect(pixel.hex).to.equal(skybluePixelData.hex);
              expect(pixel.isTransparent).to.equal(skybluePixelData.isTransparent);
            }
          }

          done();
        });
    });
  });
});
