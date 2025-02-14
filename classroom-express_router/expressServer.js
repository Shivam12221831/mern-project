const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const options = { secret: "sessionsecretcodestring", resave: false, saveUninitialized: true};

app.use(session(options));
app.use(flash());

app.use((req, res, next) =>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register", (req,res) =>{
    let { name = "Anonymous" } = req.query;
    req.session.name = name;
    if(name === "Anonymous"){
        req.flash("error", "Some error occurred");
    }else{
        req.flash("success", "user successfully registered");
    }
    // res.send(name);
    res.redirect("/hello");
});

app.get("/hello", (req, res) =>{
    // console.log(req.session);
    // res.send(`hello, ${req.session.name}`);
    res.render("page.ejs", { name: req.session.name, msg: req.flash("success")});
})


// app.get("/test", (req, res) => {
//     res.send("successfully tested!");
// });

// app.get("/reqcount", (req, res) => {
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`You have requested this url ${req.session.count} times`);
// });

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
});