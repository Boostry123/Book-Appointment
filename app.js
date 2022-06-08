require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { redirect } = require("express/lib/response");
const ejs = require("ejs")
const flash = require("connect-flash")


const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const dayAndTime = require("./dayAndTime.js")

app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect('mongodb://localhost:27017/lineDB');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  level: String
});

const appointmentSchema = new mongoose.Schema({
  user: String,
  name: String,
  phone: String,
  date: String,
  time: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
const Appoint = new mongoose.model("Appoint", appointmentSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) => {
  res.render("main")
});

app.get("/register", (req, res) => {
  res.render("register", { errors: req.flash('error') })
});

app.get("/login", (req, res) => {
  ;
  res.render("login", { error: req.flash("error") })
});

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    if(req.user.level == "user"){
      Appoint.find({user: req.user.username}, (err,foundUser)=>{
        if(!err){
          if(foundUser.length >0){
            res.render("user", { username: req.user.username , userAppoint: foundUser[0], Note:"Cant have more than 1 appointment"})
            console.log(foundUser)
          }else{
            res.render("user", {username: req.user.username , userAppoint: "No user"})
          }
          
        }else{
          console.log(err)
        }
        
      })
    }else if( req.user.level == "admin"){
      res.redirect("/admin")
    }
    

  } else {
    res.redirect("/login")
  }
});


// login  level == admin he will be redirected here and an admin panel will be loaded
app.get("/admin", (req,res) =>{
  if (req.isAuthenticated()) {
    if(req.user.level == "admin"){
      Appoint.find((err,foundAppoint)=>{
        if(!err){
          res.render("admin",{foundAppoint: foundAppoint})
        }else{
          console.log(err)
        }
        
      })
      
    }else{
      console.log("not admin")
      res.redirect("/login")
    }
    
  }else{
    res.redirect("/login")
  }
})

app.get("/userDate", (req, res) => {
  if (req.isAuthenticated()) {
    const getDays = dayAndTime.customeDay()
    res.render("userDate", { username: req.user.username, days: getDays })

  } else {
    res.redirect("/login")
  }


});

app.get("/userTime", (req, res) => {
  if (req.isAuthenticated()) {
    Appoint.find({user: req.user.username},(err,foundUser)=>{
      if(!err){
        if(foundUser){
          if(foundUser[0].date == "Friday"){
            let getTimes = dayAndTime.chosenTime("Friday")
            Appoint.find({date:"Friday"},(err,foundUser)=>{
              foundUser.forEach((user)=>{
                const index = getTimes.indexOf(user.time)
                getTimes.splice(index,1)
              })
              res.render("userTime", {username: req.user.username, times:getTimes})
            })
            
            
          }else{
            const getTimes = dayAndTime.chosenTime()
            Appoint.find({date:foundUser[0].date},(err,foundUserNormal)=>{
              foundUserNormal.forEach((user)=>{
                const index = getTimes.indexOf(user.time)
                getTimes.splice(index,1)
              })
              res.render("userTime", { username: req.user.username, times: getTimes })
            })
            
          }
        }
      }
    })
    

  } else {
    res.redirect("/login")
  }


});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err)
      res.redirect("/")
    } else {
      res.redirect("/")
    }
  })


});


app.post("/login", passport.authenticate("local", {
  successRedirect: "user",
  failureRedirect: "login",
  failureFlash: true
}));

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (password.length < 6) {
    req.flash("error", "password is too short (less than 6 digits)")
    res.redirect("/register")
  } else {
    User.register({ username: username, level: "user" }, password, (err) => {
      if (err) {
        req.flash("error", err["message"])
        res.redirect("/register")
      } else {
        passport.authenticate("local", { failureFlash: true })(req, res, () => {
          res.redirect("/user")
        });
      }
    });
  }


});

app.post("/user", (req, res) => {
  Appoint.findOne({ user: req.user.username }, (err, user) => {
    if (user) {
      console.log("user found " + req.user.username)
      res.redirect("/user")
    } else {
      const appoint = new Appoint({
        user: req.user.username,
        name: req.body.name,
        phone: req.body.phone,
        date: "",
        time: ""
      })
      appoint.save()
      res.redirect("/userDate")
    }
  });
});

//user chose his wanted date to set in his newly created appointment
app.post("/userDate", (req, res) => {
  Appoint.findOneAndUpdate({ user: req.user.username }, { date: req.body.chosenDay }, { new: true }, (err, docs) => {
    if (err) {
      console.log(err)
    }
  })
  res.redirect("/userTime")
})


//user chose his wanted time to set in his newly created appointment
app.post("/userTime", (req, res) => {
  Appoint.findOneAndUpdate({ user: req.user.username }, { time: req.body.chosenTime }, { new: true }, (err, docs) => {
    if (err) {
      console.log(err)
    }else{
      
      res.redirect("/user")
    }
  })
  
});


//this function removes the chosen appointment from the database
app.post("/removeAppointment", (req,res)=>{

  if(req.user.level == "user"){
    Appoint.findOneAndDelete({user: req.user.username},(err)=>{
      if(err){
        console.log(err)
      }else{
        console.log(req.user.username+ " removed his appointment");
        res.redirect("/user")
      }
    })
  }else if(req.user.level == "admin"){
    const appointUser = req.body.appointUser
    
    Appoint.findOneAndDelete({user: appointUser},(err)=>{
     if(err){
       console.log(err);
     }else{
       console.log("appointment removed of "+ appointUser );
       res.redirect("/admin")
     }
    })
  }
  
})













let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started success");
});