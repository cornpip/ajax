var express = require('express');
var morgan = require('morgan');
var app = express();

var users =[
    {id: 1, name: "alice"},
    {id: 2, name: "bruce"},
    {id: 3, name: "mackin"}
]

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users',function(req,res){
    return res.json(users);
});

// app.get('/users/:id',function(req,res){
//     console.log(req.params.id); // 사용자가 입력한 :id 값이 출력됨. (주의 : 서버로 오는 데이터는 전부 문자열 형식이다. 기억할 것.)
// });

//read
app.get('/users/:id', function(req,res){
    const id = parseInt(req.params.id, 10);
    if(!id){
        return res.status(400).json({err:'incorrect id'});
    }

    // filter(function(element, index, array){
    //     return 조건
    // })
    let user = users.filter(user => user.id === id)[0];
    console.log(user);
    if(!user){
        return res.status(404).json({err: 'unknown user'});
    }

    return res.json(user);
});

//delete
app.delete('/users/:id', function(req, res){
    const id = parseInt(req.params.id, 10);
    if(!id){
      return res.status(400).json({err: 'Incorrect id'});
    }

    const useridx= users.findIndex(user => user.id === id);
    if(useridx=== -1){
        return res.status(404).json({error:'unknown user'});
    }
    
    users.splice(useridx, 1);
    console.log(users);
    res.status(204).send();
});

//create
app.post('/users', (req,res)=> {
    const body = req.body
    let name = body.name;

    if(!name.length){
        return res.status(400).json({err:'incorrect name'});
    }
    let id = users.reduce((maxId, user) =>{
        return user.id > maxId ? user.id : maxId
    }, 0) + 1;

    let newUser ={
        id: id,
        name: name
    }
    
    users.push(newUser);

    console.log(newUser);
    return res.status(201).json(newUser);
})

app.listen(3000, function(){
    console.log('server on');
});

