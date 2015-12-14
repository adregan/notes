import 'babel-register';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import { Router } from 'react-router';
// import routes from './route;s';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import ejs from 'ejs';
import Login from '../src/components/login';

const server = express();
server.use(cookieParser())
server.use(express.static('static'));
server.use(compression())
server.engine('html', require('ejs').renderFile)

server.get('/?', (req, res) => {
  // TODO: Check for cookie from Keybase and forward to app if found
  // if (cookie) => loading.html else => login.html
  let login = ReactDOMServer.renderToString(<Login />);
  return res.render('index.html', {content: login});
});
server.post('/?', (req, res) => {
  // LOGIN
  // TODO: Check for cookie from Keybase and forward to app if found
  return res.render('login.html');
});


server.listen(7777);
