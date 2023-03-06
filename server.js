require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const { usersDb, website, reservations, subscriber } = require("./firebaseConfig");
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require("path");
const xml2js = require('xml2js');
const fs = require('fs');
var nodemailer = require('nodemailer');

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/hotel", async (req, res) => {

    const snapshot = await usersDb.get();
    //const list = snapshot.docs.map((doc) => ({...doc.data() }));
    const list = snapshot.docs.map((doc) => (doc.data()));

    const websnapshot = await website.get();
    const weblist = websnapshot.docs.map((doc) => (doc.data()));
    const ressnapshot = await reservations.get();
    const reservation = ressnapshot.docs.map((doc) => (doc.data()));
    //console.log(list);
    res.send({ ...list[0], weblist, reservation });
});

// app.post("/create", async(req, res) => {
//     const data = req.body;
//     const autoID = User.doc();
//     const dtaSEt = { id: autoID.id, ...data };
//     await User.doc(autoID.id).set(dtaSEt);
//     res.send({ msg: "User Added =>" + autoID.id });
// });

app.post("/subscription", async (req, res) => {
    const data = req.body;
    const autoID = subscriber.doc();
    const dtaSet = { id: autoID.id, ...data };
    await subscriber.doc(autoID.id).set(dtaSet);
    res.send({ msg: "User Added =>" + autoID.id });
});


app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// get AccomodationRoonms
app.post('/api/getRooms', (req, response) => {
    idd = req.body.postID;
    checkin = req.body.postCheckIn;
    checkout = req.body.postCheckOut;
    var url=`http://beapi.bookingwhizz.com/Connect.svc/xml/getavailability?userid=10008&password=KJH34H0D01&accommodationid=${idd}&checkin=${checkin}&checkout=${checkout}&multilanguageid=1`
    //console.log(url);
    axios
        .get(url)
        .then(res => {
            var json;
            const xml = res.data;
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    throw err;
                }
                json = JSON.stringify(result);
                response.send(json);

            });
        })
        .catch(error => {
            console.error(error)
        })

});


app.post('/api/getreservationdetails', (req, response) => {

    var url = `http://beapi.bookingwhizz.com/Connect.svc/xml/getreservationdetails?userid=10008&password=KJH34H0D01&accommodationid=${req.body.accoId}&bookingid=${req.body.bookingid}&pincode=${req.body.pincode}`;
    // console.log(url)
    axios
        .get(url)
        .then(res => {
            var json;
            console.log(`statusCodePR: ${res.status}`);
            const xml = res.data;
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    throw err;
                }
                json = JSON.stringify(result);
                response.send(json);
            });
        })
        .catch(error => {
            console.error(error)
        })

});


app.post('/api/book', (req, response) => {
    var url = `http://beapi.bookingwhizz.com/Connect.svc/xml/createreservation?userid=10008&password=KJH34H0D01&accommodationid=${req.body.postHotelId}&roomids=${req.body.roomId}&rateplanids=${req.body.ratePlanId}&extraids=${req.body.extraids}&roomqty=${req.body.roomqty}&checkin=${req.body.check_in}&checkout=${req.body.check_out}&booker_firstname=${req.body.name}&booker_lastname=${req.body.lastName}&booker_email=${req.body.email}&booker_telephone=${req.body.phone}&cc_type=${req.body.cc_type}&bookingstatus=${req.body.bookingstatus}&booker_street=''&booker_zipcode=''&booker_city=${req.body.city}&booker_country=PK&guest_qtys=${req.body.guest_qtys}&guest_names=${req.body.name}&guest_emails=${req.body.email}&guest_telephones=${req.body.phone}&comments=''&totalprice=${req.body.Total}&ratesbydate=${req.body.ratesbydate}&roomids=${req.body.roomId}&rateplanids=${req.body.ratePlanId}&payment_method=&charged_amount=10&reservation_type=&channelids=&promotion_code=&pms=0&pmsids=0&discounted_price=0.00&partnerid=3&loyaltypoints=&loyaltydiscount=&membertype=&programname=&signupdate=&statuscode=&membership_id=&converted_currency=&converted_price=0.00&sourceid=CecilWebsite&profileid=&multilanguageid=1&cc_no=&cc_cvc=`;
   // console.log(url)
    axios
        .get(url)
        .then(res => {
            var json;
            //  console.log(`statusCodeBOOK: ${res.status}`);
            const xml = res.data;
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    throw err;
                }
                json = JSON.stringify(result);
                response.send(json);
            });
        })
        .catch(error => {
            console.error(error.message)
        })
});

