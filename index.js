const express = require("express")
const ejs = require("ejs")
const path = require('path');
const serverless = require('serverless-http');
const app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("./modules/db.js")
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const anuncios = ()=> db.collection("posts").get()
const post = ()=> db.collection("entradas").get()
const entrada = (id)=> db.collection("entradas").doc(id).get()
app.listen(80, ()=>{
  console.log("hola")
})
app.get("/", async(req, res)=>{  
    const peticion =  await anuncios()
    const { docs } = peticion
    const ads = docs.map(entrada =>({ adid: entrada.id, ad: entrada.data()}))
    res.render("index", { ads } )
})
app.get("/blog", async(req, res)=>{  
  const peticion =  await post()
  const { docs } = peticion
  const ads = docs.map(entrada =>({ adid: entrada.id, ad: entrada.data()}))
  res.render("blogger", { ads } )
})
app.get("/blog/:id",  async(req, res)=>{
  const { id }= req.params
  let cityRef = await entrada(id)
  const  datos  = cityRef.data()
  console.log(datos)
  // let peticion = await busicess.where("categoria", "==", entrada.categoria).get()
  // const { docs } = peticion
  //  const entradas = docs.map(entrada =>({ datos: entrada.data()}))
  res.render("post", datos)
 })

app.get("/anuncio/:id",  async(req, res)=>{
    const { id }= req.params
    var busicess =db.collection("posts");
    let cityRef = await busicess.doc(id).get()
    const  entrada  = cityRef.data()
    let autor = await db.collection("autor").doc(entrada.autor).get()
     const anuncio = {datos: entrada, autor: autor.data()}
     busicess.doc(id).update({visitas: entrada.visitas + 1})
    res.render("blog", anuncio)
   })

   app.get("/tienda/:id",  async(req, res)=>{
    const { id }= req.params
    const db = firebase.firestore()
    const autor = await db.collection("autor").doc(id).get()
    const peticion =  await db.collection("posts").where("autor", "==", id ).get()
    const { docs } = peticion
    const ads = docs.map(ad =>({ id: ad.id, ad: ad.data()}))

    const datos ={ ads: ads, autor: autor.data(), id: id}
    
    res.render("tienda", {datos})
   })
   app.post("/tienda/calificar/:id", (req, res)=>{
    const { id }= req.params
    const db = firebase.firestore()
    const datos = db.collection("posts").doc(id)

   })
   app.get("/categorias",  function(req, res){
    const { id }= req.params
    var firebase = require("firebase/app");
    res.render("categorias")
    
   })
   app.get("/inscribete",  function(req, res){
    res.render("landing1")
    
   })
   app.get("/categorias/:id",  async(req, res)=>{
    const { id }= req.params
    const db = firebase.firestore()
    const peticion =  await db.collection("posts").where("categoria", "==", id ).get()
    const { docs } = peticion
  
    const ads = docs.map(entrada =>({ adid: entrada.id, ad: entrada.data()}))
    console.log(ads)
    const datos ={ ads: ads}
    
    res.render("categoria", { ads })
   })
   app.get("/app",  async(req, res)=>{
      res.render("app")
    
   })
   app.get("/app/:id", async(req, res)=>{
    const { id }= req.params
    const db = firebase.firestore()
    const peticion =  await db.collection("posts").where("autor", "==", id ).get()
    const { docs } = peticion
    const ads = docs.map(ad =>({ id: ad.id, ad: ad.data()}))
    res.render("dashbord", { ads })
   })
   app.get("/borrar/:id", async(req, res)=>{
    const db = firebase.firestore()
    const { id }= req.params
    const datos= await db.collection("posts").doc(id).get()
    const doc = {datos: datos.data(), id: datos.id}
    res.render("dash", {doc})
    
   })
   app.get("/app/delete/:id", async(req, res)=>{
    const db = firebase.firestore()
    const { id }= req.params

    await db.collection("posts").doc(id).delete()
    
    res.redirect("/app")
   })
   app.get("/app/edit/:id", async(req, res)=>{
    const db = firebase.firestore()
    const { id }= req.params
    const peticion= await db.collection("posts").doc(id).get()
    const  datos  = peticion.data()
    res.render("editar", peticion.data())
   })
   app.get("/app/crear",  function(req, res){
    const { id }= req.params
    var firebase = require("firebase/app");
    res.render("crear")
      
   })
   
   app.get("/api/home", async(req, res)=>{
    const db = firebase.firestore()
    const peticion =  await db.collection("posts").get()
    const { docs } = peticion
    const ads = docs.map(entrada =>({ adid: entrada.id, ad: entrada.data()}))
    res.render("app-home", { ads })
   })
   app.get("/politicas/cokkies", (req, res)=>{
     res.render("cokkis")
   })
   app.get("/sitemaps/sitemap", (req, res)=>{
    res.sendFile(__dirname + "/static/sitemaps/sitemap.xml")
  })
 