const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    // image : {
    //     type : String,
    //     default : "https://unsplash.com/photos/aerial-view-photography-of-body-of-water-FZTDjJsjG8s",
    //     set : (v) => v === "" ? "https://unsplash.com/photos/aerial-view-photography-of-body-of-water-FZTDjJsjG8s" : v,
    // },
    image : {
        filename: {
            type: String,
            trim: true, // Removes leading/trailing spaces
          },
          url: {
            type : String,
            default : "https://unsplash.com/photos/aerial-view-photography-of-body-of-water-FZTDjJsjG8s",
            set : (v) => v === "" ? "https://unsplash.com/photos/aerial-view-photography-of-body-of-water-FZTDjJsjG8s" : v,
          },
    },
    price : Number,
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;