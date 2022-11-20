const persondatamodel = require('../models/persondata')
 const bcrypt = require("bcryptjs")
 const jwt = require("jsonwebtoken")
 var Person = require("../models/persondata")

module.exports.create=function(req,res){
    bcrypt.hash(req.body.newpassword ,8 ,function(err, hashedPass){
        if(err){
           
            res.json({
                error:err
            })
        }
    
    let persondata = new persondatamodel({
        fname : req.body.fname,
        lname : req.body.lname,
        username:req.body.username,
        age : req.body.age,
        gmail : req.body.gmail,
        addrss : req.body.addrss,
        id : req.body.id,
        phonenumber: req.body.phonenumber,
        dob: req.body.dob,
        employeenumber: req.body.employeenumber,
        emiridesid: req.body.emiridesid,
        department: req.body.department,
        designation: req.body.designation,
        newpassword:hashedPass,
    })
    persondata.save()
    .then(response => {
        console.log(response);
        res.json({
            message : 'person data added success'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
           message : 'error occur'
            })
    })
}
    )}


module.exports.update =  async function(req,res){
    console.log(req.body);
 const persondataId = req.params.Id;
try {
    await persondatamodel.updateOne({_id: persondataId},{ 
    
        fname : req.body.fname,
        lname : req.body.lname,
        username:req.body.username,
        age : req.body.age,
        gmail : req.body.gmail,
        addrss : req.body.addrss,
        id : req.body.id,
        phonenumber: req.body.phonenumber,
        dob: req.body.dob,
        employeenumber: req.body.employeenumber,
        emiridesid: req.body.emiridesid,
        department: req.body.department,
        designation: req.body.designation,
        newpassword: req.body.newpassword,
     }).then((updatedpersondata)=>{
        res.status(200).json({success: true, data: updatedpersondata})
     })
        

}
catch(error)
{
    console.log(error);
    res.status(409).send({success: false, data: [],
     error: error
})}}

module.exports.delete= async function(req,res){
    const persondataId = req.params.Id;
    try {
        await persondatamodel.deleteOne({_id: persondataId},{ 
        
            fname : req.body.fname,
            lname : req.body.lname,
            username:req.body.username,
            age : req.body.age,
            gmail : req.body.gmail,
            addrss : req.body.addrss,
            id : req.body.id,
            phonenumber: req.body.phonenumber,
            dob: req.body.dob,
            employeenumber: req.body.employeenumber,
            emiridesid: req.body.emiridesid,
            department: req.body.department,
            designation: req.body.designation,
            newpassword: req.body.newpassword,
                
         }).then((deletepersondata)=>{
            res.status(200).json({success: true, data: deletepersondata})
         })
            
    
    }
    catch(error)
    {
        console.log(error);
        res.status(409).send({success: false, data: [],
         error: error
    })}}

module.exports.users = async function(req,res){

    try{
        const alldata = await persondatamodel.find()
        return res.json(alldata);
      } 
      catch(err){  
       console.log(err.message);
      }
   
}
module.exports.login = (req,res,next)=>{
    var username  = req.body.username
    var newpassword  = req.body.newpassword
    Person.findOne({gmail:username})
   .then(persondata=>{
      if(persondata){
        // console.log(persondata);
        bcrypt.compare(newpassword,persondata.newpassword,function(err , result){
            if(err){
                console.log("fsfdsfsdfsdfsfsfsfsf"+err);
               res.json({
                  error:err
               })
            }
            else if(result){
               let token = jwt.sign({usernames:persondata.username}, 'verySecretValue' , {expiresIn : '1h'})
               res.json({
                  message:'login successful!',
                  token
               })
            }else{
               res.json({
                  message:'Password does not matched!'
               })
            }
           })
      }else{
         res.json({
            message:'no user found!'
         })
      }
   })
   }
   
       

