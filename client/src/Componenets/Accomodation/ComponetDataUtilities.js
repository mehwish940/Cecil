
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from 'react-loading-skeleton';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { Pagination } from "swiper";
import { ReactComponent as Person } from "../../images/Path149.svg";
import { initiateCheckout, getForeeCheckoutURL } from "foree-checkout";

export const HeritagePhotos=[
    'images/Photo_Album/Heritage/DSC_6655.JPG',
    'images/Photo_Album/Heritage/DSC_6683.JPG',
    'images/Photo_Album/Heritage/DSC_6721-HDR.JPG',
    'images/Photo_Album/Heritage/DSC_6850copy.jpg',
    'images/Photo_Album/Heritage/DSC_6855-HDR.JPG',
    'images/Photo_Album/Heritage/DSC_6909.JPG',
    'images/Photo_Album/Heritage/DSC_7244-HDR.JPG',
    'images/Photo_Album/Heritage/DSC_7399-HDR.JPG',
    'images/Photo_Album/Heritage/DSC_7499-HDR.JPG',
    'images/Photo_Album/Heritage/DSC_7514-HDR.JPG',
    'images/Photo_Album/Heritage/DSC_7554-HDR.JPG',
    'images/Photo_Album/Heritage/DSC_7574-HDR.JPG',
]

export const StudioPhotos=[
    'images/Photo_Album/Studio/DSC_3364-HDR.JPG',
    'images/Photo_Album/Studio/DSC_3449-HDR.JPG',
    'images/Photo_Album/Studio/DSC_3615-HDR.jpg',
    'images/Photo_Album/Studio/DSC_3715-HDR.JPG',
    'images/Photo_Album/Studio/DSC_3745-HDR.JPG',
    'images/Photo_Album/Studio/DSC_3837-HDR.JPG',
    'images/Photo_Album/Studio/DSC_3874.JPG',
]


export const breakPoints = {
    0: {
        slidesPerView: 1.5,

    },
    400: {
        slidesPerView: 1.6,
    },
    600: {
        slidesPerView: 2.5,
    },
    700: {
        slidesPerView: 3,
    },
    1000: {
        slidesPerView: 4,

    },
    1200: {
        slidesPerView: 4,

    }
}
export const inputs = [
    {
        id: 1,
        name: "username",
        type: "text",
        placeholder: "Full Name",
        errorMessage:
            "It should be a valid name!",
        label: "Username",
        required: true,
    },
    {
        id: 2,
        name: "email",
        type: "email",
        placeholder: "Email",
        errorMessage: "It should be a valid email address!",
        label: "Email",
        required: true,
    },
    {
        id: 3,
        name: "phone",
        type: "tel",
        placeholder: "Phone Number",
        errorMessage: "It should be a valid phone number!",
        label: "Email",
        required: true,
    }
    ,
    {
        id: 4,
        name: "promo",
        type: "text",
        placeholder: "Promo",
        errorMessage: "It should be a valid phone number!",
        label: "Email",
        required: false,
    }

];
export const findSmallest = (data) => {
    const smallest = data.reduce(
        (acc, loc) =>
            acc.Rate[0] < loc.Rate[0]
                ? acc
                : loc
    )
    return smallest
}
export function CheckPerson({ number }) {
    if (Number(number) === 2) {
        return (
            <>
                <Person className="person" />
                <Person className="person" />

                {/* <img src={person} alt=""  />
                <img src={person} alt="" className="person" /> */}
            </>
        );
    } else {
        return (
            <>
               <span><Person className="person" /> x {number}</span>
            </>
        );
    }
}
export const checkAvailbilty = (reservation, roomid, planid, AvailablePlans, check_in, check_out) => {
    //console.log(reservation)
    const filterRes = reservation.filter(r => (r.checkIn < check_in && r.checkOut > check_in) || (r.checkIn < check_out && r.checkOut > check_out) && (r.status !== "Cancelled (hide)"));
    // console.log(filterRes)
    var filterreservedPlan = filterRes.filter(res => {
        return res.roomDetails.find(roo => roo.id == roomid && roo.planId == planid);
    });
    //console.log(filterreservedPlan)
    if (AvailablePlans > filterreservedPlan.length) {
        return true
    } else {
        return false
    }

}


export function LoadingCards() {
    return (
        <Swiper
            pagination={{
                clickable: true,
            }}
            breakpoints={breakPoints}
            centeredSlides={false}
            centerInsufficientSlides={true}
            spaceBetween={20}
            modules={[Pagination]} className="mySwiper">

            <SwiperSlide>
                <Skeleton className="Accomodation-card mb-3" height={250} borderRadius="10px" />
                <Skeleton className="mx-auto" width={200} />
            </SwiperSlide>
            <SwiperSlide>
                <Skeleton className="Accomodation-card mb-3" height={250} borderRadius="10px" />
                <Skeleton className="mx-auto" width={200} />
            </SwiperSlide>
            <SwiperSlide>
                <Skeleton className="Accomodation-card mb-3" height={250} borderRadius="10px" />
                <Skeleton className="mx-auto" width={200} />
            </SwiperSlide>
            <SwiperSlide>
                <Skeleton className="Accomodation-card mb-3" height={250} borderRadius="10px" />
                <Skeleton className="mx-auto" width={200} />
            </SwiperSlide>
        </Swiper >

    )
}


export const BookRoom = (values, BookingDetails, query, roomId, ratesbydate, extraids, roomqty, ratePlanId, guest_qtys) => {
    var bookingDetails = new Promise((resolve, reject) => {
        fetch('/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...values, name: values.username.split(' ')[0], lastName: values.username.split(' ')[1],
                postHotelId: BookingDetails.AccomodationId, check_in: query.check_in, check_out: query.check_out,
                Total: BookingDetails.Total, roomId: roomId.toString(), ratePlanId: ratePlanId.toString(), extraids: extraids.toString(),
                guest_qtys: guest_qtys, ratesbydate: ratesbydate, ProfileId: '', roomqty: roomqty.toString(),
                cc_type: values.isChecked ? 18 : 36, bookingstatus: values.isChecked ? 1 : 5
            }),
        }).then(data => data.json()).then((BookingData) => {
            //console.log(BookingData)
            if (values.isChecked) {
                resolve(BookingData.ReservationCreate.Success[0].Result[0])

            } else {
                initiateMyCheckout(BookingData.ReservationCreate.Success[0].Result[0], Number(BookingDetails.Total), values.email, values.phone, resolve, reject);
            }
        })
    });
    return bookingDetails
}

export function initiateMyCheckout(BookingData, totalPrice, email, mobileNumber, resolve, reject) {
    let URL = getForeeCheckoutURL();
    var foreeDEtail = {
        'key': '51a32000-24b4-4f85-a0a5-cb133e999c95',
        'amount': totalPrice,
        'create_bill': true,
        'reference_number': BookingData.BookingID,
        'callback': callback,
        // 'callback_url': `http://localhost:3000/information/`,
        'customer_email_address': email,
        'customer_phone_number': mobileNumber,
        "bill_details_id": BookingData.BookingID
    }
    initiateCheckout(foreeDEtail, true);
    window.onmessage = (e) => {
        if (e.origin !== URL) return;
        console.log(e.data);
        if (e.data.status == 2) {
            reject();
        }
    };

}


function callback(param) {
    window.onmessage = (e) => {
        if (e.origin !== URL) return;
        console.log(e.data);
    };
    // var hotelId = $('#hotel_id').val();
    // var status = param.status;
    // var referenceNumber = $('#referencenumber').val();
    // var bookingNo = $('#bookingno').val();
    // var sessionId = $('#sid').val();
    // var checkin = $('.checkin').val();
    // var checkout = $('.checkout').val();
    // var domain = $('.domain').val();
    // var device = $('.device').val();
    // var promocode = $('#promocode').val();
    // var promoid = $('#promoid').val();
    // var promotionDiscount = $('#promotionDiscount').val();
    // $('#paymentresponse').val(JSON.stringify(param));
    // $.ajax({
    //     url: "https://www.roomph.pk/book/functions/bookingupdate.php",
    //     type: 'POST',
    //     data: {
    //         'hotel_Id': hotelId,
    //         'status': status,
    //         'bookingNo': bookingNo,
    //         'paymentresponse': param,
    //         'sessionId': sessionId,
    //         'checkin': checkin,
    //         'checkout': checkout,
    //         'domain': domain,
    //         'device': device,
    //         'promocode': promocode,
    //         'promoid': promoid,
    //         'promotionDiscount': promotionDiscount
    //     },
    //     beforeSend: function() {

    //     },
    //     success: function(response) {
    //         var Data = JSON.parse(response);
    //         if (param.status == 1) {
    //             Data.url
    //             window.location = '' + Data.url;
    //         }
    //         if (param.status == 2) {
    //             $('#loading').hide();
    //         }

    //     }
    // });
}

// export function Retrunamenities(props) {
//   if (props.check === "KING ROOM") {
//     return (
//       <>
//         <img src={fridge} alt="icon" className='fridgeicon'></img>
//         <img src={bed} alt="bed"></img>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <img src={bed} alt="bed"></img>
//         <img src={bed} alt="bed"></img>
//       </>
//     );
//   }
// }

