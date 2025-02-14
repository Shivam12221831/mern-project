const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const cookieParser = require("cookie-parser");

// To know more either go to express docs or prefer written notes
app.use(cookieParser("secretcode"));

app.get("/getcookies", (req, res) => {
    res.cookie("greet", "Namaste");
    res.cookie("madeIn", "India");
    res.cookie("name", "Shivam");
    res.send("sent cookies successfully");
});

app.get("/getsignedcookies", (req, res) =>{
    res.cookie("color", "red", { signed: true});
    res.cookie("madeIn", "Australia", {signed: true});
    res.send("signed cookies sent!");
});

app.get("/verify", (req, res) =>{
    res.send(req.signedCookies);
});

app.get("/", (req, res) => {
    console.log(req.cookies);
    res.send("Hi, I am root");
})

app.get("/greet", (req, res) => {
    let { name = "Unknown" } = req.cookies;
    res.send(`Hi, ${name}`);
})

app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, () => {
    console.log("server is running on port 3000");
})