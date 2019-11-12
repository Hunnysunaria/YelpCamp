var express     = require("express"),
    flash=  require("connect-flash"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index"),
    doctorRoutes=  require("./routes/doctor")
    
    mongoose.connect("mongodb://localhost:27017/Appointment",{useNewUrlParser:true,
    useUnifiedTopology: true});


mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);
mongoose.set({useUnifiedTopology:true});

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error=req.flash("error");
   res.locals.success= req.flash("success");
   next();
});



app.use("/", indexRoutes);
app.use("/doctor",doctorRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);




app.listen(3200,'127.0.0.1', ()=>{
   console.log("The PORTAL Server Has Started!");
});