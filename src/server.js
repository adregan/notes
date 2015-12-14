import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import { Router } from 'react-router';
// import routes from './routes';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';

const server = express();
server.use(cookieParser())
server.use(express.static('static'));
server.engine('html', require('ejs').renderFile)

server.get('/?', (req, res) => {
  // The login handler
  return res.render('login.html');
});

server.listen(7777);
