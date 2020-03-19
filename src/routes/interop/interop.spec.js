const request = require('supertest');

const { getFastify } = require('../../factory');
const config = require('../../config');

const fixtures = require('../../__fixtures__');

const opts = {
  logger: false,
  config,
};

const { fastify } = getFastify(opts);

let tester;

jest.setTimeout(10 * 1000);

beforeAll(async () => {
  await fastify.ready();
  const port = fastify.svcs.config.fastify_base_url.split(':').pop();
  try {
    await fastify.listen(port);
  } catch (e) {
    // ignore
  }
  tester = request(fastify.server);
});

afterAll(async () => {
  await fastify.close();
});

let vc;

describe('interop', () => {
  Object.keys(fixtures).forEach(useCase => {
    describe(useCase, () => {
      describe('POST /credentials/issueCredential', () => {
        it('should issue a VC and return it in the response body', async () => {
          const res = await tester
            .post('/credentials/issueCredential')
            .set('Accept', 'application/json')
            // eslint-disable-next-line
            .send(fixtures[useCase].vcBindingModel);
          expect(res.status).toBe(200);
          expect(res.body.proof).toBeDefined();
          vc = res.body;
        });
      });
      describe('POST /verifications', () => {
        it('should return a verification result in the response body', async () => {
          const res = await tester
            .post('/verifications')
            .set('Accept', 'application/json')
            .send(vc);
          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });
      });
    });
  });
});