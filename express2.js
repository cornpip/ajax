const express = require('express');
const port = 3000;
const app = express();
 
/* static file */
app.use(express.static('public'));
 
/* body-parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
/* router */
app.get('/', function(req, res){
  res.render('index');
});
 
app.get('/dataGet', function(req, res){
  var body=req.body
  console.log(body);
  console.log('요청을 받았다!');
  res.status(200).json({name: "jinbro"});
});

app.post('/dataget2', function(req, res){
  var body=req.body
  console.log(body);
  console.log('요청을 받았다!');
  var responseData = {'result' : 'ok', 'email' : body.email};
  //res.status(200).json(body.id);
  res.status(200).json(responseData);
});
 
/* server run call back */
app.listen(port, function(){
  console.log(`server is running on ${port}`);
});
