module.exports= function (app) {
    app.get("/:id",  function(req, res){
        const { id }= req.params
        res.render("perfil")
      //   var firebase = require("firebase/app");
      //   var db = firebase.firestore()
      //   var busicess =db.collection("bisiness");
      //   let cityRef = busicess.doc(id);
      
      //   let getDoc = cityRef.get()
      //     .then(doc => {
      //       if (!doc.exists) { 
      //         return 
      //       } else {
      //         res.render("perfil", doc.data())
      //       }
      //     })
      //     .catch(err => {
      //       console.log('Error getting document', err);
      //     });
       })
    }