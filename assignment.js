var firebase=require('firebase-admin');
const express=require('express')
const app=express();
var spawn=require('child_process').spawn;
const {url}=require('./exports')
const {pass}=require('./exports')
const {id}=require('./exports')
firebase.initializeApp({
    databaseURL:url,
    credential:firebase.credential.cert('set-my-test-cc6c9-9f3daa9c7b18.json')
})

app.set('view engine','hbs');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/info',(req,res)=>{
    username=req.body.username;
    userid=req.body.userid;
    firebase.database().ref('/users').push({
        username:username,
        userid:userid
    })
    firebase.database().ref('/userInformation').push({
        username:username,
        userid:userid
    })
    var proc=spawn('python',['./assignment.py',username,userid,pass,id]);
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log('listening at http://localhost:3000')
})
