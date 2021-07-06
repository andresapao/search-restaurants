var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use(express.json());
require('./routes')(app);
app.listen(3001, function () {
//  console.log('Example app listening on port 3000!');
});
