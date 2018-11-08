const functions = require('firebase-functions');
const admin = require('firebase-admin');
/*const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();*/

admin.initializeApp(functions.config().firebase);

//const database = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//TIENDAS***************************************
exports.createStorePublic = functions.firestore
    .document('stores/{storeId}')//params: { associationId: 'bgQF9MYa1jmhsU7pv62l' }
    .onCreate((snap, context) => {
      const db = admin.firestore();
      console.log("ENTRADA DATOS", context.params.storeId);
      /*console.log("ENTRADA DATOS 1", context.params);
      console.log("ENTRADA DATOS 2", snap.params);*/

      db.collection("stores").doc(context.params.storeId).get().then((docStore) => {

        //docStore.data().id = docStore.id //le asigna el id al objeto
        console.log("TIENDA ENCONTRADA", docStore.data());
        //crear la tienda publica
        console.log("PROCEDE A CREAR TIENDA PÚBLICA");
        db.collection("storesPublic").doc(context.params.storeId).set({
          id:docStore.id,
          code:docStore.data().code,
          name:docStore.data().name,
          logo:docStore.data().logo
        })
        .then(() => {
            console.log("TIENDA PUBLICA CREADA");
            console.log("PROCEDE A ASIGNAR TIENDA A LA ASOCIACIÓN CORRESPONDIENTE", docStore.data());
            db.collection("association").doc(docStore.data().association.id).get().then((docAssoc) => {
              var asoc = docAssoc.data()
              asoc.id = docAssoc.id
              let storeWithoutAsoc = docStore.data()
              storeWithoutAsoc.id = docStore.id
              delete storeWithoutAsoc.association
              asoc.stores.push(storeWithoutAsoc)

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
        })
        .catch(function(error) {
            console.error("ERROR AL CREAR TIENDA PUBLICA", error);
        });
        //asignar la tienda a la asociacion correspondiente

      })
    }
  );

exports.updateStoresPublic = functions.firestore
    .document('stores/{storeId}')
    .onUpdate((change, context) => {
      const db = admin.firestore();
      var objPublic = {
        code: change.after.data().code,
        name: change.after.data().name,
        logo: change.after.data().logo
      }
      db.collection("storesPublic").doc(context.params.storeId).update(objPublic)
      .then((ret) => {
          console.log("UPDATED OK", ret);
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
          /*db.collection("products").doc(change.after.data().store.id).get().then((docProd) => {
            var prod = docProd.data()
            prod.id = docProd.id
            let storeWithoutAsoc = change.after.data()
            storeWithoutAsoc.id = context.params.storeId
            prod.store = storeWithoutAsoc
            db.collection("association").doc(prod.id).update(prod)
            .then((ret) => {
                console.log("ASOCIACION ACTUALIZADA OK", ret);
            })
            .catch(function(error) {
                console.error("ERROR AL ACTUALIZAR ASOCIACION", error);
            });
          })*/

      })
      .catch(function(error) {
          console.error("ERROR AL ACTUALIZAR", error);
      });
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

      db.collection("product").doc(context.params.productId).get().then((doc) => {
        var objPublic = {
          id: doc.id,
          code: doc.data().code,
          name: doc.data().name/*,
          logo: doc.data().logo,
          poster: doc.data().poster*/
        }
        if(doc.data().logo !== undefined){
          objPublic.logo = doc.data().logo
        }
        if(doc.data().poster !== undefined){
          objPublic.poster = doc.data().poster
        }

        db.collection("productPublic").doc(context.params.productId).set(objPublic)
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
        name: change.after.data().name/*,
        logo: doc.data().logo,
        poster: doc.data().poster*/
      }
      if(change.after.data().logo !== undefined){
        objPublic.logo = change.after.data().logo
      }
      if(change.after.data().poster !== undefined){
        objPublic.poster = change.after.data().poster
      }
      db.collection("productPublic").doc(context.params.productId).update(objPublic)
      .then((ret) => {
          console.log("UPDATED OK", ret);
      })
      .catch(function(error) {
          console.error("ERROR AL ACTUALIZAR", error);
      });
});

exports.deleteAssociationPublic = functions.firestore
    .document('products/{productId}')
    .onDelete((change, context) => {
      const db = admin.firestore();
      db.collection("productPublic").doc(context.params.productId).delete().then(() =>{
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
          logo: doc.data().logo
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
        logo: change.after.data().logo
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
