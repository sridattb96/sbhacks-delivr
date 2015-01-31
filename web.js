var express = require('express'),
  mongoskin = require('mongoskin'),
  bodyParser = require('body-parser')
var logfmt = require("logfmt");
var mongo = require('mongodb');
var path = require('path')
var app = express()
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/collectionName';

var db = mongoskin.db(mongoUri, {safe:true});

app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  return next()
})
app.get('/', function(req, res) {
  res.render('index.ejs', { req : req, res : res }); // !!!

})

app.get('/login', function(req, res) {
  res.render('login.ejs');
})

app.post('/post', function(req, res){
	//if (not session variable - logged into facebook) -> print out that your session is logged out
	//else -> run below
	var col = db.collection("userPosts")

	col.insert(req.body, {}, function(e,results){
		if (e){
			res.status(500).send()
		}
		else{
			res.send(results)
		}
	});
});
app.get('/newsfeedpage', function(req,res){
	res.render('newsfeed.ejs');
})
app.get('/newsfeed', function(req,res){
	var col = db.collection("userPosts")

	col.find().toArray(function(e, results){
		res.send(results);
	});
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {});


