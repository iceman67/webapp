// npm install express --save
const express = require("express");
// npm install uuid
//const uuid = require("uuid"); //Universally Unique IDentifier
// npm install cors
var cors = require('cors'); // Cross-Origin Resource Sharing

const app = express();
app.use(cors())   

// body데이터를 해석으ㄹ 위해 사용
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// 앱이 요청을 수신할 때마다 실행
app.use( (req, res, next) => {
    console.log (req.url)
    console.log('Time:', Date.now());
    next();
  });
  


const  helloworld = require('./routes/helloworld.js');
app.use('/helloworld', helloworld);
const wiki = require('./routes/wiki.js');
app.use('/wiki', wiki);
const userApi = require('./routes/users')
app.use('/users', userApi);

const account = require('./routes/account')
app.use('/account', account);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/index_register.html");
});

app.get("/update", function (req, res) {
    res.sendFile(__dirname + "/index_update.html");
});

app.get("/delete", function (req, res) {
    res.sendFile(__dirname + "/index_delete.html");
});

app.listen(8000, function () {
    console.log("Server started on port 8000");
});