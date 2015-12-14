import requests from 'superagent';
import scrypt from 'scrypt';
import {createHmac} from 'crypto';

function hex2bin(hex) {
  let bytes = [];

  for(var i=0; i< hex.length-1; i+=2){
      bytes.push(parseInt(hex.substr(i, 2), 16));
  }

  return String.fromCharCode.apply(String, bytes);
}

function getSalt(username, password) {
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
        let csrf = res.body.csrf_token
        resolve({salt, session, username, password});
      })
  })
}

function login(options = {}) {
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
        console.log(JSON.stringify(res.body.me))
        if (res.body.me) {
          resolve(res.headers['set-cookie'])
        }
        reject(Error('Login unsuccessful.'))
      })
  })
}

function KeybaseAuth(username, password) {
  getSalt(username, password)
    .then(login)
    .then(res => console.log(res))
    .catch(err => console.error(err))

}

KeybaseAuth(process.argv[2], process.argv[3]);