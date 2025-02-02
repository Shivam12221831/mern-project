const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req,res) => {
    res.send("Hi, I am root");
});

// Index Route
app.get("/listings", async (req,res) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", {allListings});
    // res.send("data fetched!");
})

// New Route 
app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
})

// Show Route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})

// Create Route
app.post("/listings", async(req,res) => {
    const listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
})

// Edit Route
app.get("/listings/:id/edit", async (req,res) => {
    let {id} = req.params;  
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

// Update Route
app.put("/listings/:id", async(req,res) => {
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async(req,res) => {
    const {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

// app.get("/testListing", async(req,res) => {
//     let sampleList = new Listing({
//         title : "My new villa",
//         description : "By the beach",
//         price : 1200,
//         location : "Calangute, Goa",
//         country : "India",
//     });
//     await sampleList.save().then(res => console.log(res)).catch(err => console.log(err));
//     console.log("sample was saved");
//     res.send("Successfully testing");
// });

const port = 8080;
app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});