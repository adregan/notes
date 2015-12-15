import 'babel-register';

import express from 'express';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import {Router} from 'react-router';
// import routes from '../src/routes';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import csrf from 'csurf';
import ejs from 'ejs';
import { getSalt, login } from '../src/keybase';
import createCookieDict from '../src/utils/cookies';

let csrfProtection = csrf({ cookie: true })
let parseForm = bodyParser.urlencoded({ extended: false })

const server = express();
server.use(cookieParser());
server.use(express.static('static'));
server.use(compression());
server.engine('html', require('ejs').renderFile);

server.get('/?', csrfProtection, (req, res) => {
  // TODO: Check for cookie from Keybase and forward to app if found
  // if (cookie) => /app else => login.html
  return res.render('login.html', {csrfToken: req.csrfToken()});
});

server.post('/?', parseForm, csrfProtection, (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  getSalt(username, password)
    .then(login)
    .then(opt => {
      let sessionCookie = opt.cookies
        .map(cookie => createCookieDict(cookie))
        .filter(cookie => cookie.name === 'session');

      res.cookie(sessionCookie.name, sessionCookie.value, sessionCookie.options);
      res.cookie('keybaseSession', sessionCookie.value);

      return res.render('app.html',
        {privateKey: opt.privateKey, publicKey: opt.publicKey});
    })
    .catch(err => console.error(err))
});

server.listen(7777);
