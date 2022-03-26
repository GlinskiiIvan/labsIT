import express from "express";
import bodyParser from "./node_modules/body-parser/index.js";
import fetch from "node-fetch";

import {
  fileURLToPath
} from 'url';
import {
  dirname
} from 'path';
import { url } from "inspector";

const __filename = fileURLToPath(
  import.meta.url);
const __dirname = dirname(__filename);

const host = '127.0.0.1';
const port = 3000;
const app = express();

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(express.static(__dirname));

const urlencodedParser = bodyParser.urlencoded({
  extended: false,
})

app.post('/message', urlencodedParser, function (
  request,
  response
) {
  if (!request.body) return response.sendStatus(400)
  const User = {
    'Имя': request.body.Name,
    'Номер телефона': request.body.Phone,
    'Email': request.body.Email,
    'Сообщение': request.body.Message
  }
  response.send(User);
})

function auth(req, res, next) {
  var authHeader = req.headers.authorization;
  if (!authHeader) {
    var err = new Error('You are not authenticated');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401; 
    next(err);
  }
  var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':'); 
  var username = auth[0];
  var password = auth[1];
  if (username == 'Ivan' && password == '123456') {
    next();
  } else {
    var err = new Error('You are not authenticated');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status  = 401; 
    next(err);
  }
}
app.use(auth);
app.get('/secret', (req, res) => {
  res.statusCode = 200;
  res.redirect('./secret.html');
});



// Start the server
const server = app.listen(port, host, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});