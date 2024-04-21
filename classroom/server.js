const express=require("express");
const app=express();

app.get("/",(req,res)=>{
    res.send("Hi,I am root");
});

// Index-users
app.get("/users",(req,res)=>{
    res.send("GET for users");
})

// Show-users
app.get("/users/:id",(req,res)=>{
    res.send("GET for users id");
})

// POST-users
app.post("/users/",(req,res)=>{
    res.send("POST for show users");
})

// DELETE-users
app.delete("/users/:id",(req,res)=>{
    res.send("Delete for users id");
})


// Post

// Index
app.get("/posts",(req,res)=>{
    res.send("GET for posts");
})

// Show
app.get("/posts/:id",(req,res)=>{
    res.send("GET for post id");
})

// POST
app.post("/posts/",(req,res)=>{
    res.send("POST for posts");
})

// DELETE
app.delete("/posts/:id",(req,res)=>{
    res.send("Delete for posts id");
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})