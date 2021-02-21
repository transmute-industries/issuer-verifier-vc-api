"use strict";
exports.__esModule = true;
/* eslint-disable global-require */
exports["default"] = {
    name: 'Transmute',
    issueCredentialConfiguration: [
        {
            id: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
            endpoint: 'https://vc.transmute.world/next/credentials/issue',
            options: {
                assertionMethod: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd'
            }
        },
    ],
    provePresentationConfiguration: [
        {
            id: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
            endpoint: 'https://vc.transmute.world/next/presentations/prove',
            options: {
                authentication: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd'
            }
        },
    ],
    deriveCredentialConfiguration: [
        {
            id: 'did:key:z5TcF9K5jTimwCWUpfkkPzdvF9xSPjRcvdMqeYWy6grZhbm8CoAdR1vos6rQzrLjm1oCjD7hoxknNk2BMrpoC8iUpAZswGm2BrkoxsNUqVFtfoNBdCtFCXduzeYZZDs5sJzdsgktZzPRfRLRGnwCV4trjYqpRZa4TYQeWG2e6HqpLynmcx3SJLuEZ2YnCdJHznRA3Ayyt',
            endpoint: 'https://vc.transmute.world/next/credentials/derive'
        },
    ],
    verifyPresentationConfiguration: {
        endpoint: 'https://vc.transmute.world/next/presentations/verify'
    },
    credentials: require('../../__interop__/credentials'),
    verifiableCredentials: require('../../__interop__/verifiableCredentials'),
    verifiablePresentations: require('../../__interop__/verifiablePresentations').map(function (item) { return item.data; })
};
