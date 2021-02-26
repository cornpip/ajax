var express = require('express');
var morgan = require('morgan');
var app = express();

var users =[
    {id: 1, name: "alice"},
    {id: 2, name: "bruce"},
    {id: 3, name: "mackin"}
];

app.use(morgan('dev'));

app.get('/users',function(req,res){
    return res.json(users);
});

// app.get('/users/:id',function(req,res){
//     console.log(req.params.id); // 사용자가 입력한 :id 값이 출력됨. (주의 : 서버로 오는 데이터는 전부 문자열 형식이다. 기억할 것.)
// });

app.get('/users/:id', function(req,res){
    const id = parseInt(req.params.id, 10);
    if(!id){
        return res.status(400).json({err:'incorrect id'});
    }
});

app.post('/users',function(req,res){
    res.send('????');
});

app.listen(3000, function(){
    console.log('server on');
});