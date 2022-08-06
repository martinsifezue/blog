
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
// const posts = [];

main().catch(err => console.log(err));

async function main(){
  await mongoose.connect("mongodb://0.0.0.0:27017/blogpostDB");
}

const blogSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Blogpost = new mongoose.model("blogpost", blogSchema);



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){


  Blogpost.find({}, function(err, foundposts){
    if(!err){
      

      res.render("home", {
        Home: "Home", 
        HomeParagraph: homeStartingContent,
      makePosts: foundposts
      });

    }
  })

})

app.get("/about", function(req, res){
  res.render("about", {AboutParagraph: aboutContent});
})

app.get("/contact", function(req, res){
  res.render("contact", {ContactParagraph: contactContent});
})

app.get("/compose", function(req, res){
  res.render("compose", {});
})

app.post("/compose", function(req, res){

  const posttitle = _.capitalize(req.body.posttitle);
  const postcontent = req.body.postcontent;


Blogpost.findOne({title: posttitle}, function(err, foundpost){

if(!err){
  if(!foundpost){

    const blogs =  new Blogpost({
      title: posttitle,
      content: postcontent
    });
      blogs.save(function(){
        res.redirect("/")
      });
  }
}


})

})




app.get("/post/:topic", function(req, res){

    //  modifiedtitle = _.lowerCase(update.title);
    
    // using the title to fetch the posts
    // modifiedparams = _.capitalize(req.params.topic);

    //using the _id to fetch the posts
    eachpost = req.params.topic
 
 Blogpost.findOne({_id: eachpost}, function(err, foundpost){

  if(!err){
    res.render("post", {
            Header: foundpost.title,
            Content: foundpost.content
      
           })
  }
 })
 
 
 
 
 
 
 
  // posts.forEach(function(update){

  //   modifiedtitle = _.lowerCase(update.title);
  //   modifiedparams = _.lowerCase(req.params.topic);
  
  //   if(modifiedtitle === modifiedparams){
  //     res.render("post", {
  //       Header: update.title,
  //      Content: update.content
  
  //     })
  //   }


  // })

})






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
