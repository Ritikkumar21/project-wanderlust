const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

router.get("/",wrapAsync(async (req,res)=>{
    const allListings= await Listing.find({});   
    res.render("listings/index.ejs",{allListings});
     }));
 
 // New Route

router.get("/new",isLoggedIn,(req,res)=>{
     res.render("listings/new.ejs");
 });

     // Show route
router.get("/:id",wrapAsync(async (req,res)=>{
     let {id}=req.params;
     const listing=await Listing.findById(id)
     .populate({
        path:"reviews",
     populate:{
        path:"author",  
     },
    })
     .populate("owner");
     if(!listing){
        req.flash("error","Listing you requested for does not exist !");
        res.redirect("/listings");
     }  
     console.log(listing);
     res.render("listings/show.ejs",{listing});
 }));
 
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
})
);

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
     }  
    res.render("listings/edit.ejs",{listing});
}));

router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async (req, res, next) => {
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

router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}));

module.exports=router;