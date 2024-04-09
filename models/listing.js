// const mongoose=require("mongoose");
// const Schema=mongoose.Schema;

// const listingSchema=new Schema({
//     title:{
//         type:String,
//         required:true,
//     },
//     description:String,
//     image: {
//        type:String,
//        default:"https://unsplash.com/photos/gray-wooden-house-178j8tJrNlc",
//        set:(v)=>v===""?"https://unsplash.com/photos/gray-wooden-house-178j8tJrNlc":v,
//     },
//     price:Number,
//     location:String,
//     country:String,
// });

// const Listing=mongoose.model("Listing",listingSchema);
// module.exports=Listing;

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
        filename: String,
        url: String
    },
    price: {
        type: Number,
    },
    location: {
        type: String
    },
    country: {
        type: String
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;