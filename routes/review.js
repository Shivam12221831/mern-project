const express = require("express");
const router = express.Router({ mergeParams: true});
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

// Post Review Route
router.post("/",isLoggedIn, validateReview, wrapAsync(async(req,res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  // console.log("review added successfully");
  req.flash("success", "New Review Added!");
  res.redirect(`/listings/${listing._id}`)
}));

// Delete Review Route
router.delete("/:reviewId", isReviewAuthor, wrapAsync(async(req, res) =>{
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
}));

module.exports = router;
  