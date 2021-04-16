const express = require("express")
const path = require('path');
const app = express()
/////firebase
require("./db/db.js")
///Mildaware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'), {
    etag: false,
  }));
  
app.listen(3000, ()=>{
    console.log("hola")
})
app.get("/", (req, res)=>{
  res.render("index")
})
app.get("/hhh", (req, res)=>{
  res.render("perfil")
})
  // app.get("/:id",  function(req, res){
  //   const { id }= req.params
  //   res.render("perfil")
  // //   var firebase = require("firebase/app");
  // //   var db = firebase.firestore()
  // //   var busicess =db.collection("bisiness");
  // //   let cityRef = busicess.doc(id);
  
  // //   let getDoc = cityRef.get()
  // //     .then(doc => {
  // //       if (!doc.exists) { 
  // //         return 
  // //       } else {
  // //         res.render("perfil", doc.data())
  // //       }
  // //     })
  // //     .catch(err => {
  // //       console.log('Error getting document', err);
  // //     });
  //  })
// require("./routes")(app)