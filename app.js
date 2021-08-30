const express = require('express');
const app= express();
const mongoose=require('mongoose');
const url = "mongodb://localhost:27017/week6doctors";
const print= console.log;
const doctors=require("./models/doctors");
const patient=require("./models/patient");
const path=require("path");
let viewsPath = __dirname + "/views/";

app.use(express.urlencoded({ extended: true }));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static("public/img"));
app.use(express.static("public/css"));
//Homepage request
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"views","index.html"));
})
//Add doctor page
app.get("/adddoctor",function(req,res){
    console.log("Add new doctor request")
    res.sendFile(path.join(__dirname,"views","adddoctor.html"));
})
app.post("/doctorpost",function(req,res){
    let newDocObj=req.body;
    let aDoctor= new doctors({
        fullname:newDocObj.fullname,
        lastname:newDocObj.lastname,
        dob:newDocObj.dob,

});
aDoctor.save(function(err){
    if(err){
        print(err);
        return;
    }
    res.send("Saved successfully");
})
});
//Add patient page
app.get("/addpatient",function(req,res){
    console.log("Add new patient request")
    res.sendFile(path.join(__dirname,"views","addpatient.html"));
})
//delete patient page
app.get("/deletepatient",function(req,res){
    console.log("delete patient request")
    res.sendFile(path.join(__dirname,"views","deletepatient.html"));
})
//patient list page
app.get("/listpatient",function(req,res){
    console.log("patient list request")
    res.sendFile(path.join(__dirname,"views","listpatient.html"));
})
//doctor list page
app.get("/listdoctor",function(req,res){
    console.log("doctorlist request")
    res.sendFile(path.join(__dirname,"views","listdoctor.html"));
})

mongoose.connect(url,function(err){
    if(err){
        print(err);
        return;
    }
    print("Successfully connected");

});
//insert a doctor to the collection
// let aDoctor= new doctors({
//     //_id:new mongoose.Types.ObjectId(),
//     //auto generate an id
//     fullname:"Mason Z",
//     numberPatients:21
    
// });
// aDoctor.save(function(err){
//     if(err){
//         print(err);
//         return;
//     }
//     print("Saved successfully");
// })
app.listen(8080);