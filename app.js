const mysql = require('mysql');
const express = require('express');
var bodyparser = require('body-parser');
var path=require('path');

var app = express();

app.use(bodyparser.json());
var urlencoded=bodyparser.urlencoded({extended:false})

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '4062',
    database:'schooldata'
});

mysqlConnection.connect((err)=> {
        if(!err)
        console.log('DB Connected Successfully');
        else
        console.log('Connection Failed!');
});

app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname + '\\index.html'));
})

app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname + '\\register.html'));
})

app.get('/update',(req,res)=>{
    res.sendFile(path.join(__dirname + '\\update.html'));
})

app.get('/view',(req,res)=>{
    res.sendFile(path.join(__dirname + '\\view.html'));
})

app.get('/delete',(req,res)=>{
    res.sendFile(path.join(__dirname + '\\delete.html'));
})

app.get('/userdetails' , (req, res) => {
    mysqlConnection.query('SELECT * FROM student', (err, rows, fields) => {
    res.send(rows);
    console.log("List of student details")
    console.log(rows)
    })
     
} );

app.get('/userdetail' , (req, res) => {
    const id=req.query.studentid;
    mysqlConnection.query('SELECT * FROM student WHERE studentid = ?',id, (err,rows, fields) => {
        res.send(rows);
        console.log("List of single student detail")
        console.log(rows)
     } )
});

app.post('/deleteuser',urlencoded, (req, res) => {
    var getJson=req.body;
    var sql = "SET @studentid = ?;";
    mysqlConnection.query('Delete FROM student WHERE studentid = '+ getJson.studentid, (err,rows, fields) => {
        res.send("successfully deleted")
        console.log("successfully deleted")
         
    } )
});

app.post('/insert' , urlencoded,(req, res) => {
    var getJson=req.body;
    var sql = "SET @studentid = ?;SET @studentname = ?;SET @studentyear = ?;SET @studentdep = ?; SET @studentemail = ?; @studentpass = ?;";
    mysqlConnection.query('INSERT INTO student(studentid,studentname,studentyear,studentdep,studentemail,studentpass) VALUES (' + getJson.studentid +",'" +getJson.studentname +"','" +getJson.studentyear +"','" +getJson.studentdep +"','"+getJson.studentemail+"','"+getJson.studentpass+"')",(err,rows, fields) => {
          console.log("inserted successfully");
          console.log(req.body)
    })
    console.log(getJson.studentid)
    res.send("inserted successfully")
});

app.post('/update' ,urlencoded, (req, res) => {
    var getJson=req.body;
    res.send("updated successfully")
    var sql = "SET @studentid = ?;SET @studentname = ?;SET @studentyear = ?;SET @studentdep = ?; SET @studentemail = ?; @studentpass = ?;";
    mysqlConnection.query("UPDATE student SET studentpass='"+getJson.studentpass+"' Where studentid=" +getJson.studentid,(err,rows, fields) => {
          console.log("updated successfully");
    })
    console.log(req.body)
    res.send("updated successfully")
});

app.listen(9000,()=>{
    console.log("server started");
});