//jshint esversion:6
const express =require("express");
const bodyParser =require("body-parser");
const request=require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
    app.post("/",function(req,res){
var fname=req.body.fname;
var lname=req.body.lname;
var email=req.body.email;

var data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname,
            }
        }
    ]
}
var jsonData=JSON.stringify(data);

var options={
    url:"https://us19.api.mailchimp.com/3.0/lists/fbadc391b3",
    method:"POST",
    // BAsic authentication
    headers:{
"Authorization":"jaiGurudev f6f6cabee8d41223e0bc585f02844801-us19 "
    },
   body:jsonData,


}
request(options,function(error,response,body){
    if(error){
     //   res.write("ERROR")
        res.sendFile(__dirname+"/failure.html");
console.log(error)
    }else {
        if(response.statusCode==200){
       console.log(response.statusCode)
    //res.write("ALL ok");
    res.sendFile(__dirname+"/success.html"); 
    }else{
        console.log(res.statusCode)
        res.sendFile(__dirname+"/failure.html");
    }
    }

})
    })
    app.post("/failure",function(req,res){
        res.redirect("/")
    })
app.listen(3000,function(){
    console.log("Hey amar");
})

//f6f6cabee8d41223e0bc585f02844801-us19
//api key

//list key
//fbadc391b3