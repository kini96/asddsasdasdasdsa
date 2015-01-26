var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3030;

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(stylus.middleware(
        {
            src: __dirname + '/public',
            compile: function(str, path) {
                return stylus(str).set('filename', path);
            }
        }
));

app.use(express.static(__dirname + '/public'));

if (env == 'development'){
     mongoose.connect('mongodb://localhost/library');
}
else {
    mongoose.connect('mongodb://admin:admin@ds027491.mongolab.com:27491/library');
}
var db = mongoose.connection;

db.once('open', function(err){
    if (err){
        console.log('Database could not be opened: ' + err);
        return;
    }

    console.log('Database up and running...')
});

db.on('error', function(err) {
    console.log('Database error: ' + err);
});

var messageSchema = mongoose.Schema({
    message: String
});

var Message = mongoose.model('Message', messageSchema);
var messageFromDatabase;

Message.remove({}).exec(function(err){
    if (err){
        console.log('Messages could not be cleared:' + err);
        return;
    }

    Message.create({message:'Hi from Mongoose'})
        .then(function(model) {
            messageFromDatabase = model.message;
        });
});

app.get('/partial/:partialName', function(req, res){
    res.render('partials/' + req.params.partialName)
});
app.get('*', function(req, res) {
	res.render('index', {message: messageFromDatabase});
});

app.listen(port);
console.log("Server running on port: " + port);
console.log(env);