# PNG TO Pixel Array
A micro-service to transform a PNG image into a pixel array than can later on be used on different things.

The general idea behind this micro-service is to generate a pixel array which can be used in games like picross.

## What's done and What's missing:
The micro-service is in fact not complete yet. Though usable, there are certain QoL things that must be done in order
to make this production ready:

- [X] API that allows image URLs & Base64
- [X] Unit tests
- [X] Use of config to handle general environment.
- [X] Core PNG to Pixel Array Transformation
- [ ] Allow to define a `transparent` color
- [ ] Allow to config max image size.
- [ ] Compile server using Webpack.

## Test:
To test, just run `yarn test` and you should be good to go. Note that logging is disabled for tests, but if you may find them useful, feel free to enable them within `config/test.json`.
