import {
  documentLoaderFactory,
  contexts,
} from '@transmute/jsonld-document-loader';
import axios from 'axios';

import { driver } from '@transmute/did-key-ed25519';
import * as bls12381 from '@transmute/did-key-bls12381';

import cmtr20 from '../contexts/cmtr-v0.2.json';
import citizenshipV1 from '../contexts/citizenship-v1.json';
import v1 from '../contexts/v1.json';
import didv011 from '../contexts/did-v0.11.json';
import sidetreev01 from '../contexts/sidetree-v0.1.json';
import didConfig from '../contexts/did-configuration-v0.2.json';
import vaccinationV1 from '../contexts/vaccination-v1.json';
import traceabilityV1 from '../contexts/traceability-v1.json';
import bbsV1 from '../contexts/bbs-v1.json';
import secV3 from '../contexts/sec-v3.json';
import rlv1 from '../contexts/rl-v1.json';
import schemaorg from '../contexts/schema-org.json';
import mavV1 from '../contexts/mav-v1.json';
import d0 from '../did-documents/d0.json';
import d2 from '../did-documents/d2.json';
import d3 from '../did-documents/d3.json';

const documentLoader = documentLoaderFactory.pluginFactory
  .build({
    contexts: {
      ...contexts.W3C_Decentralized_Identifiers,
      ...contexts.W3C_Verifiable_Credentials,
      ...contexts.W3ID_Security_Vocabulary,
    },
  })
  .addContext({
    'https://docs.element-did.com/contexts/sidetree/sidetree-v0.1.jsonld': sidetreev01,
    'https://w3c-ccg.github.io/vc-examples/cmtr/examples/v0.2/cmtr-v0.2.jsonld': cmtr20,
    'https://w3c-ccg.github.io/ldp-bbs2020/context/v1': bbsV1,
    'https://w3id.org/bbs/v1': bbsV1,
    'https://w3id.org/citizenship/v1': citizenshipV1,
    'https://w3id.org/veres-one/v1': v1,
    'https://w3id.org/did/v0.11': didv011,
    'https://identity.foundation/.well-known/contexts/did-configuration-v0.2.jsonld': didConfig,
    'https://w3id.org/vaccination/v1': vaccinationV1,
    'https://w3id.org/traceability/v1': traceabilityV1,
    'https://w3id.org/security/v3-unstable': secV3,
    'https://w3id.org/security/bbs/v1': bbsV1,
    'https://w3id.org/vc-revocation-list-2020/v1': rlv1,
    'https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/releases/11.0/schemaorgcontext.jsonld': schemaorg,
    'https://mavennet.github.io/contexts/crude-inspection-v1.0.jsonld': mavV1,
  })
  .addResolver({
    'did:key:z6': {
      resolve: async uri => {
        const { didDocument } = await driver.resolve(uri, {
          accept: 'application/did+ld+json',
        });
        return didDocument;
      },
    },
    'did:key:zUC7': {
      resolve: async uri => {
        const { didDocument } = await bls12381.driver.resolve(uri, {
          accept: 'application/did+ld+json',
        });
        return didDocument;
      },
    },
    'did:v1:test:nym:z6MkhdmzFu659ZJ4XKj31vtEDmjvsi5yDZG5L7Caz63oP39k': {
      resolve: async () => {
        return d0;
      },
    },
    'did:web:': {
      resolve: async iri => {
        const url = `https://did-web.web.app/api/v1/identifiers/${iri}`;
        const resp = await axios.get(url);
        return resp.data;
      },
    },
    'did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg': {
      resolve: async () => {
        return d2;
      },
    },
    'did:key:z5TcF9K5jTimwCWUpfkkPzdvF9xSPjRcvdMqeYWy6grZhbm8CoAdR1vos6rQzrLjm1oCjD7hoxknNk2BMrpoC8iUpAZswGm2BrkoxsNUqVFtfoNBdCtFCXduzeYZZDs5sJzdsgktZzPRfRLRGnwCV4trjYqpRZa4TYQeWG2e6HqpLynmcx3SJLuEZ2YnCdJHznRA3Ayyt': {
      resolve: async () => {
        return d3;
      },
    },

    'did:v1:test:nym': {
      resolve: async iri => {
        const url = `https://dev.uniresolver.io/1.0/identifiers/${iri}`;
        const resp = await axios.get(url);
        return resp.data.didDocument;
      },
    },

    'https://w3c-ccg.github.io/vc-http-api/fixtures/revocationList.json': {
      resolve: async iri => {
        const resp = await axios.get(iri);
        return resp.data;
      },
    },
  })
  .buildDocumentLoader();

export { documentLoader };
