var express = require("express");
var router  = express.Router();
var Doctor = require("../models/doctor");
var middleware = require("../middleware");


//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Doctor.find({}, function(err, doctors){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{doctor:doctors});
       }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var special= req.body.special;
    var Disease = req.body.Disease;
    var desc = req.body.description;
    var clinicno= req.body.clinicno;
    var patient = {
        id: req.user._id,
        username: req.user.username
    }

    var newDoctor = {name: name, special: special, Disease: Disease, description: desc, clinicno: clinicno, patient:patient}
    // Create a new campground and save to DB
    Doctor.create(newDoctor, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/Doctors");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("Doctors/new"); 
});

// SHOW - shows more info about one campground
// router.get("/:id", function(req, res){
//     //find the campground with provided ID
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundCampground)
//             //render show template with that campground
//             res.render("campgrounds/show", {campground: foundCampground});
//         }
//     });
// });

// // EDIT CAMPGROUND ROUTE
// router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
//     Campground.findById(req.params.id, function(err, foundCampground){
//         res.render("campgrounds/edit", {campground: foundCampground});
//     });
// });

// // UPDATE CAMPGROUND ROUTE
// router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
//     // find and update the correct campground
//     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//        if(err){
//            res.redirect("/campgrounds");
//        } else {
//            //redirect somewhere(show page)
//            res.redirect("/campgrounds/" + req.params.id);
//        }
//     });
// });

// // DESTROY CAMPGROUND ROUTE
// router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
//    Campground.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/campgrounds");
//       } else {
//           res.redirect("/campgrounds");
//       }
//    });
// });


module.exports = router;

