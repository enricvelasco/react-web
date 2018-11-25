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
var _montarCamposAsociacionPublic = (data) =>{
  return {
    id: data.id,
    code: data.code,
    name: data.name,
    logo: data.logo,
    verticalImage:data.verticalImage,
    showInHome:data.showInHome,
    showInApp:data.showInApp,
    address:data.address
  }
}
var _montarCamposStorePublic = (data) =>{
  var objStoreResp = {
                        id: data.id,
                        code: data.code,
                        name: data.name,
                        logo: data.logo,
                        verticalImage:data.verticalImage,
                        showInHome:data.showInHome,
                        showInApp:data.showInApp,
                        address:data.address
                      }
  objStoreResp.associationPublic = _montarCamposAsociacionPublic(data.association)
  return objStoreResp
}
var _montarCamposProductoPublic = (data)=>{
  var objProductResp = {
                        id: data.id,
                        code: data.code,
                        name: data.name,
                        logo:data.logo,
                        verticalImage:data.verticalImage,
                        showInHome:data.showInHome,
                        showInApp:data.showInApp
                      }
  objProductResp.storePublic = _montarCamposStorePublic(data.store)
  return objProductResp
}

//CREAR ASOC
exports.createAssociationPublic = functions.firestore
    .document('association/{associationId}')//params: { associationId: 'bgQF9MYa1jmhsU7pv62l' }
    .onCreate((snap, context) => {
      const db = admin.firestore();
      //1º Guardar la asociacion PUBLICA
      return db.collection("association").doc(context.params.associationId).get().then((docAsociacion) => {
        docAsociacion.data().id = docAsociacion.id
        var objetoAsocPublico = _montarCamposAsociacionPublic(docAsociacion.data())
        db.collection("associationPublic").doc(objetoAsocPublico.id).set(objetoAsocPublico).then(()=>{
          console.log("ASOCIACION PUBLICA GUARDADA CORRECTAMENTE");
        }).catch((error)=>{
          console.log("ERROR AL GUARDAR ASOC PUBLICA::", error);
        })
      }).catch((error)=>{
        console.log("ERROR AL RECUPERAR ASOCIACION", error);
      })
    });

//CREAR STORES
exports.createStorePublic = functions.firestore
    .document('stores/{storeId}')//params: { associationId: 'bgQF9MYa1jmhsU7pv62l' }
    .onCreate((snap, context) => {
      const db = admin.firestore();
      //1º Guardar la store PUBLICA
      return db.collection("stores").doc(context.params.storeId).get().then((docStore) => {
        docStore.data().id = docStore.id
        var objetoStorePublico = _montarCamposStorePublic(docStore.data())
        db.collection("storesPublic").doc(objetoStorePublico.id).set(objetoStorePublico).then(()=>{
          console.log("STORE PUBLICA GUARDADA CORRECTAMENTE");
          //AÑADIR STORE A ASOCIACIONES PARA BIG DATA -----------!!!
        }).catch((respErr)=>{
          console.log("ERROR AL GUARDAT STORE PUBLIC", respErr);
        })
      }).catch((respErr)=>{
        console.log("ERROR AL RECUPERAR STORE", respErr);
      })
    });

//CREAR PRODUCTOS
exports.createProductPublic = functions.firestore
    .document('products/{productId}')//params: { associationId: 'bgQF9MYa1jmhsU7pv62l' }
    .onCreate((snap, context) => {
      const db = admin.firestore();
      return db.collection("products").doc(context.params.productId).get().then((docProduct) => {
        docProduct.data().id = docProduct.id
        var objetoProductPublic = _montarCamposProductoPublic(docProduct.data())
        db.collection("productsPublic").doc(objetoProductPublic.id).set(objetoProductPublic).then(()=>{
          console.log("PRODUCTO PUBLICA GUARDADA CORRECTAMENTE");
          //AÑADIR PRODUCTO A TIENDAS Y ASSOCIATIONS PARA BIGDATA
        }).catch((respErr)=>{
          console.log("ERROR AL GUARDAT PRDUCTO::",respErr);
        })
      }).catch((respErr)=>{
        console.log("ERROR AL RECUPERAR PRDUCTO::",respErr);
      })
    });


//ACTUALIZAR ASOCIACIONES
exports.updateAssociationPublic = functions.firestore
    .document('association/{associationId}')
    .onUpdate((change, context) => {
      const db = admin.firestore();
      var objetoAsocPublicoUpdate = _montarCamposAsociacionPublic(change.after.data())
      return db.collection("associationPublic").doc(objetoAsocPublicoUpdate.id).update(objetoAsocPublicoUpdate)
      .then(() => {
          console.log("UPDATED OK -> next actualizar tiendas y productos");
          //HAY QUE ACTUALIZAR LAS ASOCIACIONES DE TIENDAS Y PRODYUCTOS
          //PRIVADOS
          db.collection("stores").where("association.id","==",change.after.data().id).get().then((docArrStores) => {
            docArrStores.forEach((storeLoop)=>{
              storeLoop.data().association = change.after.data()
              db.collection("stores").doc(storeLoop.data().id).update(storeLoop.data()).then(()=>{
                //ACTUALIZO LOS PRODUCTOS
                db.collection("products").where("store.id","==",storeLoop.id).get().then((docArrProducts) => {
                  docArrProducts.forEach((productLoop)=>{
                    productLoop.data().store = storeLoop.data()
                    db.collection("products").doc(productLoop.data().id).update(productLoop.data()).then(()=>{})
                  })
                })
              })
            })
          })
          //PUBLICOS
          db.collection("storesPublic").where("associationPublic.id","==",objetoAsocPublicoUpdate.id).get().then((docArrStoresPublic) => {
            docArrStoresPublic.forEach((storePublicLoop)=>{
              storePublicLoop.data().associationPublic = objetoAsocPublicoUpdate
              db.collection("storesPublic").doc(storePublicLoop.data().id).update(storePublicLoop.data()).then(()=>{
                //ACTUALIZO LOS PRODUCTOS
                db.collection("productsPublic").where("storePublic.id","==",storePublicLoop.id).get().then((docArrProductsPublic) => {
                  docArrProductsPublic.forEach((productPublicLoop)=>{
                    productPublicLoop.data().storePublic = storePublicLoop.data()
                    db.collection("productsPublic").doc(productPublicLoop.data().id).update(productPublicLoop.data()).then(()=>{})
                  })
                })
              })
            })
          })
      })
      .catch(function(error) {
          console.error("ERROR AL ACTUALIZAR - NO EXISTE", error);
          db.collection("association").doc(context.params.associationId).get().then((docAsociacion) => {
            docAsociacion.data().id = docAsociacion.id
            var objetoAsocPublico = _montarCamposAsociacionPublic(docAsociacion.data())
            db.collection("associationPublic").doc(objetoAsocPublico.id).set(objetoAsocPublico).then(()=>{
              console.log("ASOCIACION PUBLICA GUARDADA CORRECTAMENTE");
            }).catch((error)=>{
              console.log("ERROR AL GUARDAR ASOC PUBLICA::", error);
            })
          }).catch((error)=>{
            console.log("ERROR AL RECUPERAR ASOCIACION", error);
          })
      });
    });


//ACTUALIZAR STORES
exports.updateStoresPublic = functions.firestore
    .document('stores/{storeId}')
    .onUpdate((change, context) => {
      const db = admin.firestore();
      var objetoStorePublicoUpdate = _montarCamposStorePublic(change.after.data())
      return db.collection("storesPublic").doc(objetoStorePublicoUpdate.id).update(objetoStorePublicoUpdate).then(()=>{
        console.log("UPDATED OK -> next actualiza producto publico");
        //PRIVATE
        db.collection("products").where("store.id","==",change.after.data().id).get().then((docArrProducts) => {
          docArrProducts.forEach((productLoop)=>{
            productLoop.data().store = change.after.data()
            db.collection("products").doc(productLoop.data().id).update(productLoop.data()).then(()=>{})
          })
        })
        //PUBLIC
        db.collection("productsPublic").where("storePublic.id","==",objetoStorePublicoUpdate.id).get().then((docArrProductsPublic) => {
          docArrProductsPublic.forEach((productPublicLoop)=>{
            productPublicLoop.data().storePublic = objetoStorePublicoUpdate
            db.collection("productsPublic").doc(productPublicLoop.data().id).update(productPublicLoop.data()).then(()=>{})
          })
        })
      }).catch((respErr)=>{
        console.log("ERROR UPDATE STORE - NO EXISTE?", respErr);
        db.collection("stores").doc(context.params.storeId).get().then((docStore) => {
          docStore.data().id = docStore.id
          var objetoStorePublico = _montarCamposStorePublic(docStore.data())
          db.collection("storesPublic").doc(objetoStorePublico.id).set(objetoStorePublico).then(()=>{
            console.log("STORE PUBLICA GUARDADA CORRECTAMENTE");
            //AÑADIR STORE A ASOCIACIONES PARA BIG DATA -----------!!!
          }).catch((respErr)=>{
            console.log("ERROR AL GUARDAT STORE PUBLIC", respErr);
          })
        }).catch((respErr)=>{
          console.log("ERROR AL RECUPERAR STORE", respErr);
        })
      })
    });

//ACTUALIZAR PRODUCTOS
exports.updateProductPublic = functions.firestore
    .document('products/{productId}')
    .onUpdate((change, context) => {
      const db = admin.firestore();
      var objetoProductPublicUpdate = _montarCamposProductoPublic(change.after.data())
      return db.collection("productsPublic").doc(context.params.productId).update(objetoProductPublicUpdate)
      .then(() => {
          console.log("UPDATED OK");
      })
      .catch(function(error) {
          console.error("ERROR AL ACTUALIZAR - NO EXISTE?", error);
          db.collection("products").doc(context.params.productId).get().then((docProduct) => {
            docProduct.data().id = docProduct.id
            var objetoProductPublic = _montarCamposProductoPublic(docProduct.data())
            db.collection("productsPublic").doc(objetoProductPublic.id).set(objetoProductPublic).then(()=>{
              console.log("PRODUCTO PUBLICA GUARDADA CORRECTAMENTE");
              //AÑADIR PRODUCTO A TIENDAS Y ASSOCIATIONS PARA BIGDATA
            }).catch((respErr)=>{
              console.log("ERROR AL GUARDAT PRDUCTO::",respErr);
            })
          }).catch((respErr)=>{
            console.log("ERROR AL RECUPERAR PRDUCTO::",respErr);
          })
      });
    });


//DELETE ASOCIACION
exports.deleteAssociationPublic = functions.firestore
    .document('association/{associationId}')
    .onDelete((change, context) => {
      const db = admin.firestore();
      db.collection("associationPublic").doc(context.params.associationId).delete().then(() =>{
          console.log("Document successfully deleted!");
          //RECUPERAR TIENDAS Y ELIMINAR DICHA ASOC
          //PRIVATE
          db.collection("stores").where("association.id","==",context.params.associationId).get().then((docArrStores) => {
            docArrStores.forEach((storeLoop)=>{
              storeLoop.data().association = null
              db.collection("stores").doc(storeLoop.data().id).update(storeLoop.data()).then(()=>{
                //ACTUALIZO LOS PRODUCTOS
                db.collection("products").where("store.id","==",storeLoop.id).get().then((docArrProducts) => {
                  docArrProducts.forEach((productLoop)=>{
                    productLoop.data().store = storeLoop.data()
                    db.collection("products").doc(productLoop.data().id).update(productLoop.data()).then(()=>{})
                  })
                })
              })
            })
          })
          //PUBLIC
          db.collection("storesPublic").where("associationPublic.id","==",context.params.associationId).get().then((docArrStoresPublic) => {
            docArrStoresPublic.forEach((storePublicLoop)=>{
              storePublicLoop.data().associationPublic = null
              db.collection("storesPublic").doc(storePublicLoop.data().id).update(storePublicLoop.data()).then(()=>{
                //ACTUALIZO LOS PRODUCTOS
                db.collection("productsPublic").where("storePublic.id","==",storePublicLoop.id).get().then((docArrProductsPublic) => {
                  docArrProductsPublic.forEach((productPublicLoop)=>{
                    productPublicLoop.data().storePublic = storePublicLoop.data()
                    db.collection("productsPublic").doc(productPublicLoop.data().id).update(productPublicLoop.data()).then(()=>{})
                  })
                })
              })
            })
          })
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    });

//DELETE STORE
exports.deleteStoresPublic = functions.firestore
    .document('stores/{storeId}')
    .onDelete((snap, context) => {
      const db = admin.firestore();
      db.collection("storesPublic").doc(context.params.storeId).delete().then(() =>{
          console.log("DELETED OK");
          //ACTUALIZA LOS PRODUCTOS
          //PRIVATE
          db.collection("products").where("store.id","==",context.params.storeId).get().then((docArrProducts) => {
            docArrProducts.forEach((productLoop)=>{
              productLoop.data().store = null
              db.collection("products").doc(productLoop.data().id).update(productLoop.data()).then(()=>{})
            })
          })
          //PUBLIC
          db.collection("productsPublic").where("storePublic.id","==",context.params.storeId).get().then((docArrProductsPublic) => {
            docArrProductsPublic.forEach((productPublicLoop)=>{
              productPublicLoop.data().storePublic = null
              db.collection("productsPublic").doc(productPublicLoop.data().id).update(productPublicLoop.data()).then(()=>{})
            })
          })
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
});

//DELETE PRODUCTO
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

//TIENDAS***************************************
/*exports.createStorePublic = functions.firestore
    .document('stores/{storeId}')//params: { associationId: 'bgQF9MYa1jmhsU7pv62l' }
    .onCreate((snap, context) => {
      const db = admin.firestore();
      db.collection("stores").doc(context.params.storeId).get().then((docStore) => {
        db.collection("associationPublic").doc(docStore.data().association.id).get().then((docAssocPublic) => {
          db.collection("storesPublic").doc(context.params.storeId).set({
            id:docStore.id,
            code:docStore.data().code,
            name:docStore.data().name,
            logo:docStore.data().logo,
            verticalImage:docStore.data().verticalImage,
            showInHome:docStore.data().showInHome,
            showInApp:docStore.data().showInApp,
            address:docStore.data().address,
            associationPublic:docAssocPublic.data()
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

        }).catch(function(error){
          console.error("ERROR AL RECUPERAR ASOC PUBLICA", error);
        })
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
        logo: change.after.data().logo,
        verticalImage:change.after.data().verticalImage,
        showInHome:change.after.data().showInHome,
        showInApp:change.after.data().showInApp,
        address:change.after.data().address
      }
      db.collection("associationPublic").doc(change.after.data().association.id).get().then((docAssocPublic) => {
        objPublic.associationPublic = docAssocPublic.data()
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
            console.log("PRE UPDATE PRODUCT");
            db.collection("products").where("store.id","==",context.params.storeId).get().then((querySnapshot) => {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  let prodUpdate = doc.data()
                  prodUpdate.store = change.after.data()
                  db.collection("products").doc(doc.id).update(prodUpdate)
                  .then((ret) => {
                      console.log("PRODUCTO ACTUALIZADA OK", ret);
                  })
                  .catch(function(error) {
                      console.error("ERROR AL ACTUALIZAR PRODUCTO", error);
                  });
              });
            })
        })
        .catch(function(error) {
            console.error("ERROR AL ACTUALIZAR", error);
        });
      }).catch(function(error){
        console.log("ERROR AL RECUPERAR ASOC PUBLICA");
      })
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
          showInHome:doc.data().showInHome,
          showInApp:doc.data().showInApp
        }
        db.collection("storesPublic").doc(doc.data().store.id).get().then((storePublicData) => {
          objPublic.storePublic = storePublicData.data()
          db.collection("productsPublic").doc(context.params.productId).set(objPublic)
          .then(() => {
              console.log("Document successfully written!");
              //sobreescibir en tiendas y asociaciones
              var productToStore = {}
              productToStore = objPublic
              delete productToStore.storePublic
              storePublicData.productPublic.push(productToStore)
              db.collection("storesPublic").doc(storePublicData.id).update(storePublicData).then((ret) => {
                  console.log("UPDATED OK", ret);
              })
              .catch(function(error) {
                  console.error("ERROR AL ACTUALIZAR", error);
              });
              db.collection("associationPublic").doc(doc.data().store.association.id).get().then((associationPublicData) => {
                var asocPublic = associationPublicData.data()
                asocPublic.productsPublic.push(objPublic)
                db.collection("associationPublic").doc(associationPublicData.id).update(asocPublic).then((ret) => {
                  console.log("ASOC UPDATED OK");
                }).catch((error)=>{console.log("ERROR ON UPDATE ASOC");})
              })
          })
          .catch(function(error) {
              console.error("ERROR AL AÑADIR", error);
          });
        }).catch((error)=>{
          console.log("ERROR AL RECUPERAR STORE PUBLIC");
        })
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
          showInApp:doc.data().showInApp,
          address:doc.data().address
        }
        db.collection("storesPublic").where("associationPublic.id", "==", context.params.associationId).get().then((arrayStoresPublicResp) => {
          var arrayStoresPublic = []
          var arrayProductsPublic = []
          arrayStoresPublicResp.stores.forEach((storePublic)=>{
            arrayStoresPublic.push(storePublic)

            db.collection("productsPublic").where("storePublic.id", "==", storePublic.id).get().then((arrayProductsPublicResp) => {
              arrayProductsPublicResp.stores.forEach((productPublic)=>{
                arrayProductsPublic.pus
              })
            })


          })
          objPublic.storesPublic = arrayStoresPublic



          db.collection("associationPublic").doc(context.params.associationId).set(objPublic)
          .then(() => {
              console.log("Document successfully written!");
          })
          .catch(function(error) {
              console.error("ERROR AL AÑADIR", error);
          });
        }).catch((error)=>{
          console.log("ERROR AL RECUPERAR STORES PUBLIC");
        })
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
        showInApp:change.after.data().showInApp,
        address:change.after.data().address
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
});*/
//FIN ASOCIACIONES***************************************
