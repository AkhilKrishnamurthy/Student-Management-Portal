//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var mysql = require('mysql');
var pool = require('./pool');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Darkknight@1",
//     database : "studentDatabase"
// });

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var user = {
      username : "admin",
      password : "admin"
  }

  var books = [];

//Route to handle Post Request Call
// app.post('/login',function(req,res){
//         if(user.username === req.body.username && user.password === req.body.password){
//             console.log("Username is",user.username);
//             console.log("Password is",user.password);
//             res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//             req.session.user = user;
//             res.writeHead(200,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Successful Login");
//         }

    
// });
app.post('/login',function(req,res){
    
    console.log("Inside Login Post Request");
   
    pool.getConnection(function(err,con) {
        if (err) 
            throw err;
        console.log("Connected!");
        var username = req.body.username;
        var password = req.body.password;
        var sql = "SELECT *  FROM login WHERE username = " + 
                mysql.escape(username) + " and password = " + mysql.escape(password);
                console.log(sql);
        con.query(sql,function(err,result){
            if(err){
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
            }else{
                 console.log(JSON.stringify(result));
                if(result.length>0) {
                    res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.user = req.body.username;
                     res.writeHead(200,{
                         'Content-Type' : 'text/plain'
                     })
                     res.end("Successful Login");
                }
            }
        });
    });
});

app.post('/home',function(req,res){
        var sql = "INSERT INTO studentDetails VALUES ( " + 
        mysql.escape(req.body.studentname) + " , " + mysql.escape(req.body.studentID) +" , " + mysql.escape(req.body.department) +" ) ";
                console.log(sql);
                pool.getConnection(function(err,con){
                    if(err){
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Could Not Get Connection Object");
                    }
        con.query(sql,function(err,result){
            if(err){
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
            }else{
                 res.writeHead(200,{
                     'Content-Type' : 'text/plain'
                 })
                 res.end("Successful post");
            }
            });
        });
    
        // var det = {"BookID" : req.body.studentname, "Title" : req.body.studentID, "Author" : req.body.department}
        // books.push(det);
        // res.end("Successful post");

});
app.post('/userReport',function(req,res){
    var sql = "DELETE FROM studentDetails WHERE studentID = " +  mysql.escape(req.body.id);
                console.log(sql);
                pool.getConnection(function(err,con){
                    if(err){
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Could Not Get Connection Object");
                    }
        con.query(sql,function(err,result){
            if(err){
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
            }else{
                 res.writeHead(200,{
                     'Content-Type' : 'text/plain'
                 })
                 res.end("Successful delete");
            }
        })
        });
    // console.log("Inside user report delete");
    // console.log(req.body);    
    // books.splice(req.body.id,1);
    // console.log(books);

     
});

app.get('/userReport', function(req,res){
    var sql = "SELECT *  FROM studentDetails";
                console.log(sql);
                pool.getConnection(function(err,con){
                    if(err){
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Could Not Get Connection Object");
                    }
        con.query(sql,function(err,result){
            if(err){
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid get");
            }else{
                 res.writeHead(200,{
                     'Content-Type' : 'text/plain'
                 })
                 res.end(JSON.stringify(result));
            }
        })
        });
    // console.log("Inside user report get");    
    // res.writeHead(200,{
    //     'Content-Type' : 'application/json'
    // });
    // console.log(books);
    // console.log("Books : ",JSON.stringify(books));
    // res.end(JSON.stringify(books));
    
})
app.get('/home', function(req,res){
    console.log("Inside home get");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    // res.end("JSON.stringify(books)");
    res.end("home");
    
})

//Route to get All Books when user visits the Home Page
/*app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
})*/
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");