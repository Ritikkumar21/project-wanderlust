const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedin}=require("../middleware.js");

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

router.get("/",wrapAsync(async (req,res)=>{
    const allListings= await Listing.find({});   
    res.render("listings/index.ejs",{allListings});
     }));
 
 // New Route
router.get("/new",isLoggedin,(req,res)=>{
    console.log(req.user);
     res.render("listings/new.ejs");
 });
 
     // Show route
router.get("/:id",wrapAsync(async (req,res)=>{
     let {id}=req.params;
     const listing=await Listing.findById(id).populate("reviews");
     res.render("listings/show.ejs",{listing});
 }));
 
router.post("/",isLoggedin,validateListing,wrapAsync(async(req,res,next)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
})
);

router.get("/:id/edit",isLoggedin,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
     }  
    res.render("listings/edit.ejs",{listing});
}));

router.put("/:id",isLoggedin,validateListing,wrapAsync(async (req, res, next) => {
    let {id} = req.params;
    let {title, image, description, location, country, price}  = req.body.listing;
    
    let newL = await Listing.findByIdAndUpdate(id, {
        title:title,
        description:description,
        location:location,
        country:country,
        price:price,
        'image.url' :image
    }, {new:true});
    console.log(newL);
    req.flash("success","Listing Updated !");
    res.redirect(`/listings/${id}`);
    })
);  

router.delete("/:id",isLoggedin,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}));

module.exports=router;