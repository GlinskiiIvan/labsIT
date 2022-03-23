// Require packages and set the port
const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
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
    console.log(request.body)
    response.send(
      `Имя: ${request.body.Name} <br/>
       Номер телефона: ${request.body.Phone} <br/>
       Enail: ${request.body.Email} <br/>
       Сообщение: ${request.body.Message} <br/>`
    )
  })
 
// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});

