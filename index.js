// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.set('port', 3000);

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// Deliveres the static files under public for every route
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//Empty param
app.get('/api', (req, res) => {
  const timestamp = new Date();
  res.json({
    unix: timestamp.getTime(),
    utc: `${timestamp.toUTCString()}`,
  });
});

//Param with special Date
app.get('/api/:date', function (req, res) {
  let date = new Date(req.params.date);
  isNaN(date) ? (date = new Date(parseInt(req.params.date))) : false;
  if (date instanceof Date && !isNaN(date.valueOf())) {
    res.json({
      unix: date.getTime(),
      utc: `${date.toUTCString()}`,
    });
  } else {
    res.json({
      error: 'Invalid Date',
    });
  }
});

// listen for requests :)
var listener = app.listen(app.get('port'), function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
