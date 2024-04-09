const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);      
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hi,I am root");
});


app.get("/listings",async (req,res)=>{
   const allListings= await Listing.find({});   
   res.render("listings/index.ejs",{allListings});
    });

// New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});


    // Show route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

app.post("/listings",async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

app.listen(8080,()=>{
    console.log("Server listining on port 8080");
});
// app.get()

// app.get("/testListing", async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India",
//     }); 
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("successful testing");
// });

