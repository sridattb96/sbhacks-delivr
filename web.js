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
  'mongodb://localhost:27017/mydb';

var db = mongoskin.db(mongoUri, {safe:true})

app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  return next()
})
app.get('/', function(req, res) {
  res.render('index.ejs');
})
app.get('/test', function(req, res){

  res.send(req.protocol + '://' + req.get('host'));
})

app.get('/login', function(req, res) {
  res.render('login.ejs');
})

//post a request for a food delivery

app.post('/post', function(req, res){
	//check for session variable - logged into facebook
	//if not, print out that your session is logged out. else run below
	var col = db.collection("userPosts")

	var restaurant = req.body.Restaurant;
	var timeRange = req.body.TimeRange;
	var myLocation = req.body.MyLocation;
	var deliveryPrice = req.body.DeliveryPrice;
	var timeOfPost = req.body.TimeOfPost;

	col.insert(req.body, {}, function(e,results){
		if (e){
			res.status(500).send()
		}
		else{
			res.send("Success!")
		}
	});

	console.log(restaurant)
	console.log(timeRange)
	console.log(myLocation)
	console.log(deliveryPrice)
	console.log(timeOfPost)

});

app.get('/test/post', function(req,res){
	var col = db.collection("userPosts")

	col.find().toArray(function(e, results){
		res.send(results)
	});
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {});


