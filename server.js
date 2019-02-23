const express=require('express');
const bodyparser=require('body-parser');
const nodemailer=require('nodemailer');
const {temp,perma}=require('./db');


const app=express()
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

const transporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
    type:"OAuth2",
    user:"test29051571833@gmail.com",
    clientId:"1647090856-048o62scffaricme516kgm42ct16q7ic.apps.googleusercontent.com",
    clientSecret:"AkZXEARQqYF5WpNjsSnSYvbm",
    refreshToken:"1/zxEsqUsvkJkgJKXCPONNMkh2EwsdV0Oql0ls7XG19rFb3dch2aiyk8nVPTQwe1Ib"
    }
})
const verfiy=(email)=>{
    const mailoption={
        from:"test29051571833@gmail.com",
        to:email,
        subject:"Verification email",
        html:'<p>Click the link for Completing your verification process your password<a href="http://localhost:3002/verification/'+email+'">Verify</a></p>'
    }

    transporter.sendMail(mailoption,(err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(res);
        }
    })
}

app.post('/register',(req,res)=>{
    const db=new temp
    db.device_id=req.body.device_id
    db.Name=req.body.Name
    db.Password=req.body.Password
    db.MobileNo=req.body.MobileNo
    db.Email=req.body.Email
    db.IEMI=req.body.IEMI
    db.Flag=0
    db.Date=new Date()

    db.save().then(user=>{
        if(user){
            verfiy(user.Email)
            res.send("verification link sent!");
        }
    }).catch(err=>{
        res.status(400).json(err);
})
})

app.get('/verification/:email',(req,res)=>{
    console.log(req.params.email);
    temp.findOne({Email:req.params.email}).then(user=>{
        const db=new perma
        db.device_id=user.device_id
        db.Name=user.Name
        db.Password=user.Password
        db.MobileNo=user.MobileNo
        db.Email=user.Email
        db.IEMI=user.IEMI
        db.Flag=user.Flag
        db.Date=new Date()

        db.save().then(user=>{
            res.status(200).json("ok");
        })
    })
})

app.post('/login',(req,res)=>{
    perma.findOne({Email:req.body.Email},{Password:true}).then(user=>{
        if(req.body.Password === user.Password)
            res.status(200).json("LoggedIn");
        else
            res.status(400).json("Wrong credentials");
    })
})

app.listen(process.env.PORT||3002);
