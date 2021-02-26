var express = require('express');
var app = express();


app.use(express.static('public'));
//==================================
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
//=================================
app.set('view engine', 'ejs');
app.set('views', __dirname + '/node_modules');

app.get('/', function(req, res){
    res.render('index.html');
});
app.get('/dateget', function(req, res){
    console.log('요청 on');
    res.status(200).json({'name':'hello'});
});

app.listen(3000, function(){
    console.log("server on");
});