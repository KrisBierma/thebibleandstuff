const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

// middleware to parse JSON from http request
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function() {
  console.log('Server now listening on port ' + PORT);
});
