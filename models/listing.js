const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default:
      'https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    set: (v) =>
      v === ""
        ? 'https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
        : v,
  },
  // image : {
  //     filename: {
  //         type: String,
  //         trim: true, // Removes leading/trailing spaces
  //       },
  //       url: {
  //         type : String,
  //         default : "https://unsplash.com/photos/aerial-view-photography-of-body-of-water-FZTDjJsjG8s",
  //         set : (v) => v === "" ? "https://unsplash.com/photos/aerial-view-photography-of-body-of-water-FZTDjJsjG8s" : v,
  //       },
  // },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
