var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();
var shortUrl = require('./models/shortUrl');

var port = process.env.PORT || 3000

app.use(bodyparser.json());
app.use(cors());
//Connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls')

//Allow node to find static content
app.use(express.static(__dirname + '/public'));

app.get('/new/:urlToShorten(*)', (req, res, next) => {
    //ES5 ver urlToShorten = req.params.urlToShorten
    var { urlToShorten } = req.params;
    //Regex for url
    var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    if(regex.test(urlToShorten) === true) {
      var short = Math.floor(Math.random()*100000).toString();
      var data = new shortUrl({
        originalUrl: urlToShorten,
        shorterUrl: short
      });
      data.save(err=>{
        if(err){
          return res.send('Error saving to database');
        }
      })
      return res.json(data);
    }
    var data = new shortUrl({
      originalUrl: 'urlToShorten doesn\'t match regex',
      shorterUrl: 'invalid url'
    })
    return res.json(data);
});

app.get('/:urlToForward', (req,res,next) => {
  var shorterUrl = req.params.urlToForward;
  shortUrl.findOne({'shorterUrl' : shorterUrl}, (err, data) => {
    if(err){
      return res.send('Error reading database');
    }
    var re = new RegExp("^(http|https):..", "i")
    var strToCheck = data.originalUrl;
    if(re.test(strToCheck)){
      res.redirect(301, data.originalUrl);
    }
    else{
      res.redirect(301, 'http://' + data.originalUrl);
    }
  })
})



app.listen(port, () => {
    console.log('Listening on port ' + port);
});
