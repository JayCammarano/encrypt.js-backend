// TO-Do Add DB integratiom
import jsrsasign, { KJUR } from 'jsrsasign';

// TO-DO GenerateSecureKey as env variable
const generateJWT = (claims: Object, key: string, algorithm: string) => {
  const header = {
    alg: algorithm,
    typ: 'JWT'
  };
  const sClaims = JSON.stringify(claims);
  const sHeader = JSON.stringify(header);

  return KJUR.jws.JWS.sign('HS512', sHeader, sClaims, key);
};

const validateJWT = (token: string, key: string, algorithm: string) => {
  return KJUR.jws.JWS.verifyJWT(token, key, {
    alg: [algorithm]
  });
};

const decodeJWT = (token: string) => {
  const tokenArray = token.split('.');
  const uHeader = jsrsasign.b64utos(tokenArray[0]);
  const uClaim = jsrsasign.b64utos(tokenArray[1]);

  const parsedHeader = KJUR.jws.JWS.readSafeJSONString(uHeader);
  const parsedClaim = KJUR.jws.JWS.readSafeJSONString(uClaim);

  return { header: parsedHeader, claim: parsedClaim };
};

export { generateJWT, validateJWT, decodeJWT };
