import requests from 'superagent';
import scrypt from 'scrypt';
import {createHmac} from 'crypto';
import createCookieDict from './utils/cookies';

export function getSalt(username, password) {
  let saltURL = 'https://keybase.io/_/api/1.0/getsalt.json';
  let query = {email_or_username: username};

  return new Promise((resolve, reject) => {
    requests
      .get(saltURL)
      .query(query)
      .end((err, res) => {
        if (err) {
          reject(err);    
        }
        let salt = res.body.salt;
        let session = res.body.login_session;
        resolve({salt, session, username, password});
      })
  })
}

export function login(options = {}) {
  if (!Object.keys(options).length) {
    throw Error('Missing options obj containing salt and session');
  }
  let session = options.session;
  let params = {
    N: Math.pow(2, 15),
    r: 8,
    p: 1
  };

  let binarySalt = new Buffer(options.salt, 'hex');
  let decodedSession = new Buffer(session, 'base64');

  let pwh = scrypt.hashSync(
    options.password, params, 224, binarySalt).slice(192, 224);

  let hmac = createHmac('sha512', pwh);
  hmac.write(decodedSession);
  let hmacPWH = hmac.digest('hex');

  let loginURL = 'https://keybase.io/_/api/1.0/login.json';
  let query = {
    email_or_username: options.username,
    hmac_pwh: hmacPWH,
    login_session: session
  }
  return new Promise((resolve, reject) => {
    requests
      .post(loginURL)
      .query(query)
      .end((err, res) => {
        if (err) {
          reject(err);
        }
        if (res.body.me) {
          let privateKey = res.body.me.private_keys.primary;
          let publicKey = res.body.me.public_keys.primary;
          let cookies = res.headers['set-cookie'];
          let sessionCookie = cookies
            .map(cookie => createCookieDict(cookie))
            .filter(cookie => cookie.name === 'session');

          resolve({privateKey, publicKey, sessionCookie})
        }
        reject(Error('Login unsuccessful. Please ensure your username and passphrase are correct.'))
      })
  })
}

export function KeybaseLogin(username, password) {
  return getSalt(username, password).then(login);
}
