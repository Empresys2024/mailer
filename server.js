var express=require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
var cors = require('cors')
var app=express();

var corsOptions = {
  origin: ['https://facturacion-cedieslab.vercel.app', 'https://facturacion-f0du2hcpq-juanquiroz.vercel.app'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use(cors(corsOptions))
require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it is working
app.use(bodyParser.json())

app.get('/',function(req,res){
res.sendfile('index.html');
});

var smtpTransport = nodemailer.createTransport({
    service: "Outlook", // Cambia "gmail" a "Outlook"
    auth: {
      user: "facturaciongallitosmananeros@outlook.com", // Cambia a tu dirección de correo
      pass: "David456" // Cambia a tu contraseña
    }
  });

app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});



app.listen(3000,function(){
console.log("Express Started on Port 3000");
});
