const functions = require('firebase-functions');
const admin = require('firebase-admin');
/*const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();*/

admin.initializeApp(functions.config().firebase);

const database = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createAssociationPublic = functions.firestore
    .document('association/{associationId}')//params: { associationId: 'bgQF9MYa1jmhsU7pv62l' }
    .onCreate((snap, context) => {
      const db = admin.firestore();
      console.log("ENTRADA DATOS", context.params.associationId);

      db.collection("association").doc(context.params.associationId).get().then((doc) => {
        var objPublic = {
          id: doc.id,
          code: doc.data().code,
          name: doc.data().name
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
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const db = admin.firestore();
      const newValue = change.after.data();
      db.collection("associationPublic").doc(tcontext.params.associationId).update(newValue)
      .then(() => {
          console.log("UPDATED OK");
      })
      .catch(function(error) {
          console.error("ERROR AL ACTUALIZAR", error);
      });
      // ...or the previous value before this update
      //const previousValue = change.before.data();

      // access a particular field as you would any JS property
      //const name = newValue.name;

      // perform desired operations ...
});

/*_loadData(){
  //this.setState({loading:true})
  this.rows = []
  db.collection(this.props.urlMapping).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
          // doc.data() is never undefined for query doc snapshots
          let registro = {}

          registro = doc.data()
          registro.id = doc.id
          registro.codigoLink = {id:registro.id, code:registro.code}
          this.rows.push(registro)
      });
      this._moutColumns()
      this.setState({loading:false})
      console.log("RESULTADO", querySnapshot);
  }).catch((err)=>{
    console.log(err);
  });
}*/

/*exports.createUserParams = functions.auth.user().onCreate(event =>{
  var user = event.data;
  var idUser = user.uid

  db.collection("userParams").doc(idUser).set({
      code:null,
      idUserLevel:null,
      name:"no name",
      urlReference: null
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
});*/

/*exports.returnUserParams = functions.https.onCall((recurso) => {
  console.log("ENTRA EN FUNCION", recurso);
  var bd = functions.database.ref('cities');
  bd.add({
    name: 'Tokyo',
    country: 'Japan'
  }).then(ref => {
    console.log('Added document with ID: ', ref.id);
    return "HA LLAMADO FUNCION"
  });
});*/
