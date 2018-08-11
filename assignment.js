var firebase=require('firebase-admin');
const express=require('express')
const app=express();
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
    console.log('inserted sucessfully')
    firebase.database().ref('/userInformation').push({
        username:username,
        userid:userid
    })
    var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: id,
    pass: pass
  }
});

var mailOptions = {
  from:id,
  to:userid,
  subject: 'SET MY TEST',
  text: 'Dear '+username+',Welcome to our app'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log('listening at http://localhost:3000')
})
