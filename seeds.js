var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name:"Cloud's Rest",
        image: "https://source.unsplash.com/K9olx8OF36A",
        description: "blah blah blah"
    },
    {
        name:"Desert Mountain",
        image: "https://source.unsplash.com/3fJOXw1RbPo",
        description: "V cool spot dude like totally"
    },
    {
        name:"Big Bend",
        image: "https://source.unsplash.com/tRGwX1HcTd4",
        description: "blah blah blah"
    },
    
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else{
                        console.log("added a campground");
                        //create a comment
                        Comment.create({
                            author: "Homer",
                            text: "This place is great, wish there was internet"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                            
                        })
                    }
                });
            });
    })
    //add a few comments
}

module.exports = seedDB;