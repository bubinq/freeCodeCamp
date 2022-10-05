// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
  const respObj = {}
  const rawDate = new Date().valueOf()
  respObj['unix'] = new Date(rawDate).getTime()
  respObj['utc'] = new Date(rawDate).toUTCString()

  res.json({ "unix": respObj.unix, "utc": respObj.utc })
})

app.get('/api/:date', (req, res) => {
  const rawDate = req.params.date
  const respObj = {}
  if (Number(rawDate)) {
    respObj['unix'] = new Date(Number(rawDate)).getTime()
    respObj['utc'] = new Date(Number(rawDate)).toUTCString()
      
  } else {
    respObj['unix'] = new Date(rawDate).getTime()
    respObj['utc'] = new Date(rawDate).toUTCString()
  }

  if (!respObj.unix || !respObj.utc) {
    res.json({ "error": "Invalid Date" })
  } else {

    res.json({ "unix": respObj.unix, "utc": respObj.utc })
  }
    
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
