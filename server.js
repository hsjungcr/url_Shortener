var express = require('express');
var bodyparser = require ('body-parser');
var cors = require ('cors');
var mongoose = require ('mongoose');
var app = express();
var port = process.env.PORT || 3000
app.use(bodyparser.json());
app.use(cors());

app.use(express.static(__dirname + '/public'));

app.get('/new/:urlToShorten(*)',(req, res, next)=>{
  //ES5 ver urlToShorten = req.params.urlToShorten
var { urlToShorten } = req.params;
return res.json({ urlToShorten });
});



app.listen(port, ()=>{
  console.log('Listening on port ' + port);
});
