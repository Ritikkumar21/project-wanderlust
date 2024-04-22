const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String, // Since description is optional, it can be defined simply as a String
    image: { // Define image as an object with filename and url properties
        filename: String,
        url: String
    },
    price: {
        type: Number,
        required: true, // Assuming price is always required for a listing
    },
    location: String, // Assuming location is a simple string
    country: String, // Assuming country is a simple string
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review", // Assuming you have a Review model defined elsewhere
    },
],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
},
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
