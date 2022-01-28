const customers = require("./customers.json");
const orders = require("./orders.json");

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const credentials = require("./credentials.json");

initializeApp({
  credential: cert(credentials),
});

const dsdb = getFirestore();

const custRef = dsdb.collection("customers");
const ordRef = dsdb.collection("orders");

custRef
  .add(customers[3])
  .then((doc) => {
    console.log("Added customer", doc.id);
  })
  .catch((err) => {
    console.error(err);
  });

ordRef
  .add(orders[3])
  .then((doc) => {
    console.log("Added order", doc.id);
  })
  .catch((err) => {
    console.error(err);
  });

//update a field
dsdb
  .collection("orders")
  .doc("ooyWV0vquzhe0q7D0Jzu")
  .set({
    customerId: "kGvSMCRTID1JhyzVFTNq",
    cart: [
      {
        productID: 76543,
        quantity: 2,
      },
      {
        productID: 12233,
        quantity: 1,
      },
    ],
    totalPrice: 51.97,
    deliveryDate: "2/3/2022",
  })
  .then((doc) => {
    console.log("updated order");
  })
  .catch((err) => {
    console.error(err);
  });

//update/add a field
dsdb
  .collection("customers")
  .doc("NjcOMjOU8fs05HFgdHIC")
  .update({ zipcode: 33443 })
  .then((doc) => {
    console.log("updated customer zipcode");
  })
  .catch((err) => {
    console.error(err);
  });

//read one document
custRef
  .doc("NjcOMjOU8fs05HFgdHIC")
  .get()
  .then((doc) => {
    console.log(doc.id, " => ", doc.data());
  })
  .catch((err) => console.error(err));

//read a collection
ordRef
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  })
  .catch(console.error);

// query a collection
ordRef
  .where("delivery date", "==", "2/2/2022")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.data());
    });
  })
  .catch(console.error);
