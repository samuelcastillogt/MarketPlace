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
app.get("/", async(req, res)=>{
  var firebase = require("firebase/app");
    var db = firebase.firestore()
    var business = await db.collection("bisiness").get()
    
    var { docs }= business
    const negocios = docs.map(negocio =>({datos: negocio.data()}))
    var blog = await db.collection("posts").get()
    var { docs } = blog
    const posts = docs.map(post =>({datos: post.data()}))
    var datos = {negocios: negocios, posts: posts}
   res.render("index", { datos })
})

  app.get("/business/:id",  async(req, res)=>{
    const { id }= req.params
    
    var firebase = require("firebase/app");
    var db = firebase.firestore()
    var busicess =db.collection("bisiness");
    let cityRef = await busicess.doc(id).get();
    let cityRef2 = await busicess.doc(id).collection("publicaciones").get();

    const  negocio  = cityRef.data()
    var { docs } = cityRef2
    const posts = docs.map(publicacion =>({ publicacion: publicacion.data()}))
    let peticion = await busicess.where("categoria", "==", negocio.categoria).get()
    var { docs } = peticion
     const negocios = docs.map(negocio =>({ datos: negocio.data()}))
    const perfil = {datos: negocio, relaciondas: negocios, publicacion: posts}
    res.render("perfil", perfil)
   
   })
   app.get("/blog/:slug",  function(req, res){
    const { slug }= req.params
      
    var firebase = require("firebase/app");
    var db = firebase.firestore()
    var blog =db.collection("posts");
    let cityRef = blog.doc(slug);
    let getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) { 
          return 
        } else {
          res.render("blog", doc.data())
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
   
    
   })
