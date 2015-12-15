import 'babel-register';

import express from 'express';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import {Router} from 'react-router';
// import routes from '../src/routes';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import ejs from 'ejs';

const server = express();
server.use(cookieParser());
server.use(express.static('static'));
server.use(compression());
server.use(bodyParser.urlencoded({extended: true}));
server.engine('html', require('ejs').renderFile);

server.get('/?', (req, res) => {
  // TODO: Check for cookie from Keybase and forward to app if found
  // if (cookie) => /app else => login.html
  return res.render('login.html');
});
server.get('/login/?', (req, res) => {
  return res.redirect(303, '/');
});
server.post('/login/?', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  
  return res.sendStatus(200);
});


server.listen(7777);
