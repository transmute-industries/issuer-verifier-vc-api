import defaultSuiteConfig from './defaultSuiteConfig';
import * as httpClient from '../../services/httpClient';

import { getTestServer } from '../../server';

const suiteConfig: any = (global as any).suiteConfig || defaultSuiteConfig;

let server: any;

beforeAll(async () => {
  server = await getTestServer();
  await server.listen(8080);
});

afterAll(async () => {
  await server.close();
});

if (suiteConfig.deriveCredentialConfiguration) {
  describe('Derive Credential API - Conformance', () => {
    // Load in the static test fixtures
    const { verifiableCredentials } = suiteConfig;

    // Deal with possible polymorphic issuer configuration
    const deriveCredentialConfiguration = Array.isArray(
      suiteConfig.deriveCredentialConfiguration
    )
      ? suiteConfig.deriveCredentialConfiguration
      : [suiteConfig.deriveCredentialConfiguration];

    deriveCredentialConfiguration.forEach((value: any) => {
      describe(`with holder: ${value.id}`, () => {
        it("1. The Holder's deriveCredential HTTP API MUST return a 201 HTTP response status code after successful credential derivation.", async () => {
          const firstDerivableCredential = verifiableCredentials
            .map((item: any) => item.data)
            .find((vc: any) => {
              return vc.proof.type === 'BbsBlsSignature2020';
            });

          const body = {
            verifiableCredential: firstDerivableCredential,
            frame: value.frame,
          };

          const res = await httpClient.postJson(value.endpoint, body, {});
          expect(res.status).toBe(201);
          expect(res.body.proof.type).toBe('BbsBlsSignatureProof2020');
        });
      });
    });
  });
}
