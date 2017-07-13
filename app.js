var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
seedDB();


// Campground.create(
//   {name: "Ghost Valley", image: "https://source.unsplash.com/K9olx8OF36A", description: "Beautiful site perched on top of Ghost Valley. No Bathrooms. No water"}
//   , function(err, campground){
//         if(err){
//         console.log(err);
//     } else{
//         console.log("New Campground");
//         console.log(campground);
//         }
//     });



app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - Show all campgrounds
app.get("/campgrounds", function(req,res){
    //get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

//CREATE - add new campground to db
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    if(!image){ image = "https://source.unsplash.com/5Rhl-kSRydQ"};
    var newCampground = {name: name, image: image, description: desc}
    //Create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
             //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
})

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
})


//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           console.log(foundCampground);
           res.render("show", {campground: foundCampground});
       }
    });
    //render thos template with that campground
  
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started!");
});