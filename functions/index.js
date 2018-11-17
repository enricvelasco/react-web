const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require("node-fetch");
/*const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();*/

admin.initializeApp(functions.config().firebase);

const apiMaps = "AIzaSyDFa7RY03_NVSV-VDs6dIFafo8Tr7yH9fM"
//const database = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
/*const generateLatAndLongFromDirection = (address) => {
  return new Promise((resolve, reject) => {
    let streetNumber= address.number
    let route= address.street
    let city=address.city
    let postalCode =address.postalCode
    let country = address.country
    let formatedAddress = streetNumber + route+ ', ' +city+' '+postalCode+', '+country
      fetch('https://maps.googleapis.com/maps/api/geocode/json?formatted_address='+ formatedAddress +'&key='+apiMaps)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            //return;
            resolve(null)
          }

          // Examine the text in the response
          response.json().then(function(data) {
            console.log("****",data.results[0].geometry.location);
            resolve(data.results[0].geometry.location)
            //return
          });
        }
      )
      .catch(function(err) {
        resolve(null)
      });
  });
};*/

var functRetCoo = function(address){
  let promise = new Promise((resolve, reject)=>{
    let streetNumber= address.number
    let route= address.street
    let city=address.city
    let postalCode =address.postalCode
    let country = address.country
    let formatedAddress = streetNumber + route+ ', ' +city+' '+postalCode+', '+country
      fetch('https://maps.googleapis.com/maps/api/geocode/json?formatted_address='+ formatedAddress +'&key='+apiMaps)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            //return;
            resolve(null)
          }
          console.log("DEBERIA SER NORMAL", response);
          resolve("hola")

          // Examine the text in the response
          /*response.json().then(function(data) {
            console.log("****",data.results[0].geometry.location);
            resolve(data.results[0].geometry.location)
            //return
          });*/
        }
      )
      .catch(function(err) {
        resolve(null)
      });
  })
  return promise
}

//TIENDAS***************************************
exports.createStorePublic = functions.firestore
    .document('stores/{storeId}')//params: { associationId: 'bgQF9MYa1jmhsU7pv62l' }
    .onCreate((snap, context) => {
      const db = admin.firestore();
      db.collection("stores").doc(context.params.storeId).get().then((docStore) => {
        db.collection("storesPublic").doc(context.params.storeId).set({
          id:docStore.id,
          code:docStore.data().code,
          name:docStore.data().name,
          logo:docStore.data().logo,
          verticalImage:docStore.data().verticalImage,
          showInHome:docStore.data().showInHome,
          showInApp:docStore.data().showInApp
        })
        .then(() => {
            db.collection("association").doc(docStore.data().association.id).get().then((docAssoc) => {
              var asoc = docAssoc.data()
              asoc.id = docAssoc.id
              let storeWithoutAsoc = docStore.data()
              storeWithoutAsoc.id = docStore.id
              delete storeWithoutAsoc.association
              asoc.stores.push(storeWithoutAsoc)
              db.collection("association").doc(asoc.id).update(asoc)
              .then((ret) => {
                  console.log("ASOCIACION ACTUALIZADA OK", ret);
              })
              .catch(function(error) {
                  console.error("ERROR AL ACTUALIZAR ASOCIACION", error);
              });
            })
        })
        .catch(function(error) {
            console.error("ERROR AL CREAR TIENDA PUBLICA", error);
        });
      })
    }
  );

exports.updateStoresPublic = functions.firestore
    .document('stores/{storeId}')
    .onUpdate((change, context) => {
      const db = admin.firestore();

      if(change.after.data().direction !== undefined){
        functRetCoo(change.after.data().direction).then(function(resp){
            console.log("RESPUESTA ASYNC", resp);
            change.after.data().direction.coordinates = resp
            var objPublic = {
              code: change.after.data().code,
              name: change.after.data().name,
              logo: change.after.data().logo,
              verticalImage:change.after.data().verticalImage,
              showInHome:change.after.data().showInHome,
              showInApp:change.after.data().showInApp,
              direction:change.after.data().direction
            }
            db.collection("stores").doc(context.params.storeId).update({direction:change.after.data().direction})
            db.collection("storesPublic").doc(context.params.storeId).update(objPublic)
            .then((ret) => {
                db.collection("association").doc(change.after.data().association.id).get().then((docAssoc) => {
                  var asoc = docAssoc.data()
                  asoc.id = docAssoc.id
                  let storeWithoutAsoc = change.after.data()
                  storeWithoutAsoc.id = context.params.storeId
                  delete storeWithoutAsoc.association
                  var arrStores = []
                  asoc.stores.forEach((val)=>{
                    if(val.id === storeWithoutAsoc.id){
                      arrStores.push(storeWithoutAsoc)
                    }else{
                      arrStores.push(val)
                    }
                  })
                  asoc.stores = arrStores
                  db.collection("association").doc(asoc.id).update(asoc)
                  .then((ret) => {
                      console.log("ASOCIACION ACTUALIZADA OK", ret);
                  })
                  .catch(function(error) {
                      console.error("ERROR AL ACTUALIZAR ASOCIACION", error);
                  });
                })
            })
            .catch(function(error) {
                console.error("ERROR AL ACTUALIZAR", error);
            });
          },
          function(err){

          }
        )
        //generateLatAndLongFromDirection(change.after.data().direction).then(coordinates => {
          //console.log("RESPUESTA->",coordinates);
          //change.after.data().direction.coordinates = functRetCoo(change.after.data().direction)
          //change.after.data().direction.lat = coordinates.lat
          //change.after.data().direction.long = coordinates.long
          /*var objPublic = {
            code: change.after.data().code,
            name: change.after.data().name,
            logo: change.after.data().logo,
            verticalImage:change.after.data().verticalImage,
            showInHome:change.after.data().showInHome,
            showInApp:change.after.data().showInApp,
            direction:change.after.data().direction
          }
          db.collection("stores").doc(context.params.storeId).update({direction:change.after.data().direction})
          db.collection("storesPublic").doc(context.params.storeId).update(objPublic)
          .then((ret) => {
              db.collection("association").doc(change.after.data().association.id).get().then((docAssoc) => {
                var asoc = docAssoc.data()
                asoc.id = docAssoc.id
                let storeWithoutAsoc = change.after.data()
                storeWithoutAsoc.id = context.params.storeId
                delete storeWithoutAsoc.association
                var arrStores = []
                asoc.stores.forEach((val)=>{
                  if(val.id === storeWithoutAsoc.id){
                    arrStores.push(storeWithoutAsoc)
                  }else{
                    arrStores.push(val)
                  }
                })
                asoc.stores = arrStores
                db.collection("association").doc(asoc.id).update(asoc)
                .then((ret) => {
                    console.log("ASOCIACION ACTUALIZADA OK", ret);
                })
                .catch(function(error) {
                    console.error("ERROR AL ACTUALIZAR ASOCIACION", error);
                });
              })
          })
          .catch(function(error) {
              console.error("ERROR AL ACTUALIZAR", error);
          });
        //});*/
      }






});

exports.deleteStoresPublic = functions.firestore
    .document('stores/{storeId}')
    .onDelete((snap, context) => {
      const db = admin.firestore();
      console.log("TIENDA ELIMINADA", snap.data());
      db.collection("storesPublic").doc(context.params.storeId).delete().then(() =>{
          console.log("DELETED OK");
          db.collection("association").doc(snap.data().association.id).get().then((docAssoc) => {
            var asoc = docAssoc.data()
            asoc.id = docAssoc.id
            let storeWithoutAsoc = snap.data()
            storeWithoutAsoc.id = context.params.storeId
            delete storeWithoutAsoc.association
            //asoc.stores.push(storeWithoutAsoc)
            var arrStores = []
            asoc.stores.forEach((val)=>{
              if(val.id !== storeWithoutAsoc.id){
                arrStores.push(val)
              }
            })
            asoc.stores = arrStores

            console.log("ANTES DE ACTUALIZAR LA ASOC", asoc);
            console.log("ANTES DE ACTUALIZAR LA ASOC --- STORE", storeWithoutAsoc);
            db.collection("association").doc(asoc.id).update(asoc)
            .then((ret) => {
                console.log("ASOCIACION ACTUALIZADA OK", ret);
            })
            .catch(function(error) {
                console.error("ERROR AL ACTUALIZAR ASOCIACION", error);
            });
          })

      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
});
//FIN TIENDAS***************************************


//PRODUCTOS*****************************************
exports.createProductPublic = functions.firestore
    .document('products/{productId}')//params: { associationId: 'bgQF9MYa1jmhsU7pv62l' }
    .onCreate((snap, context) => {
      const db = admin.firestore();
      console.log("ENTRADA DATOS", context.params.productId);

      db.collection("products").doc(context.params.productId).get().then((doc) => {
        var objPublic = {
          id: doc.id,
          code: doc.data().code,
          name: doc.data().name,
          logo:doc.data().logo,
          verticalImage:doc.data().verticalImage,
          poster:doc.data().poster,
          showInHome:doc.data().showInHome,
          showInApp:doc.data().showInApp
        }

        db.collection("productsPublic").doc(context.params.productId).set(objPublic)
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("ERROR AL AÑADIR", error);
        });

      }).catch((err)=>{
        console.log(err);
      });
});

exports.updateProductPublic = functions.firestore
    .document('products/{productId}')
    .onUpdate((change, context) => {
      const db = admin.firestore();
      var objPublic = {
        code: change.after.data().code,
        name: change.after.data().name,
        logo:change.after.data().logo,
        verticalImage:change.after.data().verticalImage,
        poster:change.after.data().poster,
        showInHome:change.after.data().showInHome,
        showInApp:change.after.data().showInApp
      }
      db.collection("productsPublic").doc(context.params.productId).update(objPublic)
      .then((ret) => {
          console.log("UPDATED OK", ret);
      })
      .catch(function(error) {
          console.error("ERROR AL ACTUALIZAR", error);
      });
});

exports.deleteProductPublic = functions.firestore
    .document('products/{productId}')
    .onDelete((change, context) => {
      const db = admin.firestore();
      db.collection("productsPublic").doc(context.params.productId).delete().then(() =>{
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
});


//ASOCIACIONES***************************************
exports.createAssociationPublic = functions.firestore
    .document('association/{associationId}')//params: { associationId: 'bgQF9MYa1jmhsU7pv62l' }
    .onCreate((snap, context) => {
      const db = admin.firestore();
      console.log("ENTRADA DATOS", context.params.associationId);

      db.collection("association").doc(context.params.associationId).get().then((doc) => {
        var objPublic = {
          id: doc.id,
          code: doc.data().code,
          name: doc.data().name,
          logo: doc.data().logo,
          verticalImage:doc.data().verticalImage,
          showInHome:doc.data().showInHome,
          showInApp:doc.data().showInApp
        }
        db.collection("associationPublic").doc(context.params.associationId).set(objPublic)
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("ERROR AL AÑADIR", error);
        });

      }).catch((err)=>{
        console.log(err);
      });
});

exports.updateAssociationPublic = functions.firestore
    .document('association/{associationId}')
    .onUpdate((change, context) => {
      const db = admin.firestore();
      var objPublic = {
        code: change.after.data().code,
        name: change.after.data().name,
        logo: change.after.data().logo,
        verticalImage:change.after.data().verticalImage,
        showInHome:change.after.data().showInHome,
        showInApp:change.after.data().showInApp
      }
      db.collection("associationPublic").doc(context.params.associationId).update(objPublic)
      .then((ret) => {
          console.log("UPDATED OK", ret);
      })
      .catch(function(error) {
          console.error("ERROR AL ACTUALIZAR", error);
      });
});

exports.deleteAssociationPublic = functions.firestore
    .document('association/{associationId}')
    .onDelete((change, context) => {
      const db = admin.firestore();
      db.collection("associationPublic").doc(context.params.associationId).delete().then(() =>{
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
});
//FIN ASOCIACIONES***************************************

//USERS*******************************************
exports.createNewUserWithParams = functions.firestore
.document('userParams/{userId}')//params: { associationId: 'bgQF9MYa1jmhsU7pv62l' }
.onCreate((snap, context) => {
  console.log("ENTRADA DATOS 1", context.params);
  console.log("ENTRADA DATOS 2", snap);
  /*admin.auth().createUserWithEmailAndPassword("").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });*/
})
