import React, { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Button } from "../Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { Navigation } from "swiper";
import 'react-loading-skeleton/dist/skeleton.css'
import moment from 'moment';
import { RoomInformationModal, RoomModal } from './BookingModals';
import { LoadingCards, breakPoints, findSmallest, CheckPerson } from './ComponetDataUtilities';
import { IoIosInformationCircle } from "react-icons/io";

function Accomodation({ query, setquery, Accomodationid, title }) {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [Infoopen, InfosetOpen] = useState(false);
  const [roomInfoModal, setRoomInfoiModal] = useState('');
  const [RoomDetails, setRoomDetails] = useState([]);
  const [BookingDetails, setBookingDetails] = useState({
    plansDetail: '',
    Total: 0,
    Tax: 0,
    AccomodationId: Accomodationid,
    nights: moment(query.check_out).diff(moment(query.check_in), 'days')
  });


  useEffect(() => {
    //  console.log(query.check_in)
    fetch('/api/getRooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postID: BookingDetails.AccomodationId, postCheckIn: query.check_in, postCheckOut: query.check_out }),

    }).then((roomsDetails) => {
      // console.log(roomsDetails);
      if (!roomsDetails.ok) {
        throw Error('could not fetch the data for that resorce')
      }
      return roomsDetails.json()
    }).then((roomsDetailsJSon) => {
      console.log(roomsDetailsJSon)
      setRooms(roomsDetailsJSon['Success']['Result'][0]['HotelRooms']);
      // console.log(roomsDetailsJSon['Success']['Result'][0]['HotelRooms']);
      setquery({ ...query, AccomodationLoading: false })

    }).catch(err => {
      console.log(err)
    })


  }, [query.AccomodationLoading])

  const handleOpen = () => setOpen(true);
  const InfohandleOpen = (room, smallest) => {
    setRoomInfoiModal({
      rooms: room,
      smallest: smallest
    })
    InfosetOpen(true);
  }
  const handleClose = () => setOpen(false);
  const InfohandleClose = () => InfosetOpen(false);


  const pushRoomDetails = (roomID) => {
    var check = RoomDetails.find(f => f.roomID == roomID);
    if (!check) {
      var fRooms = rooms.find(f => f['RoomId'][0] == roomID);
      const smallest = findSmallest(fRooms["RatePlanDetails"][0]['RatePlans']);
      setRoomDetails([...RoomDetails, { roomID: roomID }]);
      setBookingDetails({ ...BookingDetails, plansDetail: [...BookingDetails.plansDetail, { ...fRooms, smallest, quantity: 1 }], Total: (BookingDetails.Total + parseInt(smallest['Rate'])) })
    }
    handleOpen();
  }

  return (
    <div className="Accomodation text-center w-100 position-relative" id='accomodations'>
      <div className="Accomodation-head">
        {/* <span className='font-20'>BOOK YOUR ACCOMMODATION</span> */}
        <h2 className='font-weight-600'>{title}</h2>
        {/* checkout Modal started from here ! */}
        <Dialog
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          open={open}
          onClose={handleClose}
          scroll="body"
          fullWidth={true}
          PaperProps={{
            style: {
              overflow: 'visible',
              boxShadow: '1px 1px 0px 1px rgb(0 0 0 / 40%)'
            },
          }}
        >
          {/* {console.log(BookingDetails)} */}
          <RoomModal
            query={query} RoomDetails={RoomDetails} handleClose={handleClose} setBookingDetails={setBookingDetails} BookingDetails={BookingDetails} rooms={rooms} />
        </Dialog >
        {/* {console.log(rooms)} */}

        {/* Rooms Information Modal starts from here */}
        <Dialog
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          open={Infoopen}
          onClose={InfohandleClose}
          fullWidth={true}
        >
          <RoomInformationModal roomInfoModal={roomInfoModal} />
        </Dialog >


        {query.AccomodationLoading ?
          <LoadingCards /> :
          rooms ?
            <Swiper
              pagination={{ clickable: true }}
              breakpoints={breakPoints}
              centeredSlides={false}
              centerInsufficientSlides={true}
              spaceBetween={10}
              navigation={true}
              edgeSwipeThreshold={50}
              modules={[Navigation]}
              className='mySwiper'>
              {
                rooms.map((r, i) => {
                  //console.log(r)
                  const smallest = findSmallest(r["RatePlanDetails"][0]['RatePlans']);
                  return (
                    <SwiperSlide key={r['RoomId'][0]}>
                      <AccomodationCard
                        Bookcheck={true}
                        InfohandleOpen={InfohandleOpen}
                        room={r}
                        smallest={smallest}
                        onClick={() => r["RatePlanDetails"][0]['RatePlans'].length !== 0 ? pushRoomDetails(r['RoomId'][0]) : window.scrollTo({ top: 0, behavior: "smooth" })} />
                    </SwiperSlide>
                  )
                })}
            </Swiper>
            : null
        }

      </div>
    </div>
  );
}


export function AccomodationCard({ Bookcheck, room, smallest, onClick, InfohandleOpen }) {
  return (
    <div className="Accomodation-card">
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(47, 70, 95,0.5),rgba(47, 70, 95,0.5)), url(${room['RoomImages'][0]['RoomImage'][0]['$']['Photo_Max500']})`,
        }}
        className="Accomodation-item">
        <div className="m-2">
          <div className='info-icon' onClick={() => InfohandleOpen(room, smallest)}>
            <IoIosInformationCircle />
          </div>
          <div className='Accomodation-item-top'>
            <p>{smallest['RatePlanName']}</p>
            <CheckPerson number={smallest['MaxPerson']} />
          </div>
        </div>
        <div className="Accomodation-item-bottom m-3">
          <span>{smallest['RatePlanCurrencyCode']} {smallest['Rate']}/night</span>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" onClick={onClick}>{Bookcheck ? 'BOOK NOW' : 'CHANGE DATE'}</Button>
        </div>
      </div>
      <div className="description-div">
        <span className='font-20 bolder primiary-font text-uppercase'>{room['RoomName']}</span>
      </div>
    </div>
  );
}





export default Accomodation
