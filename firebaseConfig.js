require("dotenv").config();
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const usersDb = db.collection('hotels').where('id', '==', process.env.HOTEL_ID);
const website = db.collection('setupWebsite').where('hotelId', '==', process.env.HOTEL_ID);
const reservations = db.collection('reservations').where('hotelId', '==', process.env.HOTEL_ID);
const subscriber = db.collection('subscriber');

module.exports = {usersDb, website, reservations, subscriber};
