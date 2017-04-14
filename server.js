var express = require('express');
var bodyparser = require ('body-parser');
var cors = require ('cors');
var mongoose = require ('mongoose');
var app = express();
var port = process.env.PORT || 3000
app.use(bodyparser.json());
app.use(cors());

app.get('/',(req,res)=>{

});

app.listen(port, ()=>console.log('Listening on port ' + port));
