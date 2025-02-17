const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in first!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error", "Your are not the owner of this listing");
      return res.redirect(`/listings/${id}`);
    }
    next();
}

// Linsting Model Validator
module.exports.validateListing = (req, res, next) => {
    // if (req.file) {
    //   req.body.listing.image.url = req.file.path;       // Cloud storage or local path
    //   req.body.listing.image.filename = req.file.filename; // File name from storage
    // };
    let { error } = listingSchema.validate(req.body);
    // console.log(error);
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else{
      next();
    }
};

// Review Model Validator
module.exports.validateReview = (req, res, next) =>{
    let { error } = reviewSchema.validate(req.body);
    // console.log(error);
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else{
      next();
    }
}

module.exports.isReviewAuthor = async(req, res, next) => {
  const { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error", "Your are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}