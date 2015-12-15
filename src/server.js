import 'babel-register';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import routes from '../src/routes';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import csrf from 'csurf';
import ejs from 'ejs';
import { KeybaseLogin } from '../src/keybase';
import createCookieDict from '../src/utils/cookies';

let csrfProtection = csrf({ cookie: true })
let parseForm = bodyParser.urlencoded({ extended: false })
let parseJSON = bodyParser.json()

const server = express();
server.use(cookieParser());
server.use(express.static('static'));
server.use(compression());
server.engine('html', require('ejs').renderFile);

server.use((req, res) => {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } 
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } 
    else if (renderProps) {
      let content = renderToString(<RoutingContext {...renderProps} />);
      res.render('index.html', {content: content})
    } 
    else {
      res.status(404).send('Not found')
    }
  })
});

server.post('/login/?', parseJSON, (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  KeybaseLogin(username, password)
    .then(resp => {
      return res.send(resp);
    })
    .catch(err => {
      return res.status(400).send({error: err});
    });
});

server.listen(7777);
