import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import FormInputs from "../BasicUtillities/FormInputs";
import { BookRoom, CheckPerson, inputs } from "./ComponetDataUtilities";
import { ReactComponent as FreeWifi } from "../../images/029-wifi.svg";
import { ReactComponent as Parking } from "../../images/parking.svg";
import { ReactComponent as NoSMoking } from "../../images/011-no-smoking.svg";
import { ReactComponent as Pet } from "../../images/pet.svg";
import { ReactComponent as Bed } from "../../images/026-bed.svg";
import { ReactComponent as Disabled } from "../../images/disabled.svg";
import { ReactComponent as Fridge } from "../../images/004-fridge.svg";
import { ReactComponent as Family } from "../../images/family-room.svg";
import { ReactComponent as Microwave } from "../../images/microwave.svg";
import { ReactComponent as AirCondition } from "../../images/air-conditioner-.svg";
import { ReactComponent as RoomServices } from "../../images/room-service-com.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Navigation } from "swiper";
import { Button } from "../Button/Button";

export function RoomModal({
  RoomDetails,
  query,
  handleClose,
  BookingDetails,
  setBookingDetails,
  rooms,
}) {
  const [show, setShow] = useState({
    bookingDetails: "",
    show: 0,
    loading: false,
  });
  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    promo: "",
    city: "",
    isChecked: false,
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow({ ...show, loading: true });
    var roomId = new Array();
    var extraids = new Array();
    var ratePlanId = new Array();
    var roomqty = new Array();
    var ratesbydate = "";
    var guest_qtys = "";

    for (let r = 0; r < BookingDetails.plansDetail.length; r++) {
      for (let i = 0; i < BookingDetails.plansDetail[r].quantity; i++) {
        roomId.push(BookingDetails.plansDetail[r].RoomId);
        ratePlanId.push(BookingDetails.plansDetail[r].smallest.RatePlanId[0]);
        extraids.push(0);
        roomqty.push(BookingDetails.plansDetail[r].quantity);
        if (ratesbydate != "") {
          if (i == 0) {
            ratesbydate +=
              "|" +
              BookingDetails.plansDetail[r].smallest.RateDetailsByDate[0]
                .RatePerDate[0]["$"]["Rate"];
            guest_qtys +=
              "|" + BookingDetails.plansDetail[r].smallest.MaxPerson[0];
          } else {
            ratesbydate +=
              "," +
              BookingDetails.plansDetail[r].smallest.RateDetailsByDate[0]
                .RatePerDate[0]["$"]["Rate"];
            guest_qtys +=
              "," + BookingDetails.plansDetail[r].smallest.MaxPerson[0];
          }
        } else {
          ratesbydate =
            BookingDetails.plansDetail[r].smallest.RateDetailsByDate[0]
              .RatePerDate[0]["$"]["Rate"];
          guest_qtys = BookingDetails.plansDetail[r].smallest.MaxPerson[0];
        }
      }
    }
    console.log(
      "room=>" + roomId.toString(),
      "estraID=>" + extraids.toString(),
      "plans=>" + ratePlanId.toString(),
      "roomQ=>" + roomqty.toString(),
      "rates=>" + ratesbydate,
      "guest=>" + guest_qtys,
      "Total=>" + BookingDetails.Total
    );
    //setShow({ ...show, loading: false, show: 2 })
    const BookingData = await BookRoom(
      values,
      BookingDetails,
      query,
      roomId,
      ratesbydate,
      extraids,
      roomqty,
      ratePlanId,
      guest_qtys
    );
    console.log(BookingData);
    setShow({ ...show, bookingDetails: BookingData, loading: false, show: 2 });
  };
  return (
    <div className="checkout-modal-top">
      <div className="checkout-modal">
        <div className="modal-top d-flex justify-content-between">
          <div className="modal-heading">Reservation Details</div>
          {show.show !== 2 ? (
            <div className="checkIn-checkOut">
              <div className="modal-calnder">
                <span>
                  <svg
                    id="Capa_1"
                    height="512"
                    viewBox="0 0 512 512"
                    width="512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        fill="#ffff"
                        d="m391.017 251.454h35.714c8.074 0 14.643-6.569 14.643-14.643v-35.714c0-8.074-6.569-14.643-14.643-14.643h-35.714c-8.074 0-14.643 6.569-14.643 14.643v35.714c0 8.074 6.569 14.643 14.643 14.643zm.357-50h35v35h-35zm-.357 145h35.714c8.074 0 14.643-6.569 14.643-14.643v-35.714c0-8.074-6.569-14.643-14.643-14.643h-35.714c-8.074 0-14.643 6.569-14.643 14.643v35.714c0 8.074 6.569 14.643 14.643 14.643zm.357-50h35v35h-35zm-102.273-45h35.714c8.074 0 14.643-6.569 14.643-14.643v-35.714c0-8.074-6.569-14.643-14.643-14.643h-35.714c-8.074 0-14.643 6.569-14.643 14.643v35.714c0 8.074 6.569 14.643 14.643 14.643zm.357-50h35v35h-35zm-168.475 170.546h-35.714c-8.074 0-14.643 6.569-14.643 14.643v35.714c0 8.074 6.569 14.643 14.643 14.643h35.714c8.074 0 14.643-6.569 14.643-14.643v-35.714c0-8.074-6.569-14.643-14.643-14.643zm-.357 50h-35v-35h35zm.357-235.546h-35.714c-8.074 0-14.643 6.569-14.643 14.643v35.714c0 8.074 6.569 14.643 14.643 14.643h35.714c8.074 0 14.643-6.569 14.643-14.643v-35.714c0-8.075-6.569-14.643-14.643-14.643zm-.357 50h-35v-35h35zm168.475 107.773h35.714c8.074 0 14.643-6.569 14.643-14.643v-35.714c0-8.074-6.569-14.643-14.643-14.643h-35.714c-8.074 0-14.643 6.569-14.643 14.643v35.714c0 8.074 6.569 14.643 14.643 14.643zm.357-50h35v35h-35zm159.365-259.953h-32.066v-11.467c0-12.576-10.231-22.807-22.807-22.807h-3.444c-12.575 0-22.806 10.231-22.806 22.807v11.467h-223.4v-11.467c0-12.576-10.231-22.807-22.807-22.807h-3.444c-12.576 0-22.807 10.231-22.807 22.807v11.467h-32.065c-20.705 0-37.55 16.845-37.55 37.55v402.676c0 20.678 16.822 37.5 37.5 37.5h385.748c20.678 0 37.5-16.822 37.5-37.5v-402.676c-.001-20.705-16.846-37.55-37.552-37.55zm-66.123-11.467c0-4.305 3.502-7.807 7.807-7.807h3.444c4.305 0 7.807 3.502 7.807 7.807v11.467h-19.058zm-272.457 0c0-4.305 3.502-7.807 7.807-7.807h3.444c4.305 0 7.807 3.502 7.807 7.807v11.467h-19.057v-11.467zm361.131 451.693c0 12.407-10.093 22.5-22.5 22.5h-385.748c-12.407 0-22.5-10.093-22.5-22.5v-.047c6.284 4.735 14.095 7.547 22.551 7.547h304.083c10.03 0 19.46-3.906 26.552-10.999l77.562-77.562zm-85.215-17.059c.588-2.427.908-4.958.908-7.563v-50.064c0-9.44 7.681-17.121 17.122-17.121h50.063c2.605 0 5.136-.32 7.563-.908zm85.215-315.987h-319.574c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h319.574v194.118c0 9.441-7.681 17.122-17.122 17.122h-50.063c-17.712 0-32.122 14.41-32.122 32.121v50.064c0 9.441-7.681 17.122-17.121 17.122h-291.769c-12.434 0-22.55-10.116-22.55-22.551v-287.996h81.173c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-81.174v-69.63c0-12.434 10.116-22.55 22.55-22.55h32.066v22.052c0 12.576 10.231 22.807 22.807 22.807 4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5c-4.305 0-7.807-3.502-7.807-7.807v-22.052h257.458v22.052c0 12.576 10.231 22.807 22.807 22.807 4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5c-4.305 0-7.807-3.502-7.807-7.807v-22.052h66.124c12.434 0 22.55 10.116 22.55 22.55zm-350.391 137.773h-35.714c-8.074 0-14.643 6.569-14.643 14.643v35.714c0 8.074 6.569 14.643 14.643 14.643h35.714c8.074 0 14.643-6.569 14.643-14.643v-35.714c0-8.075-6.569-14.643-14.643-14.643zm-.357 50h-35v-35h35zm66.559-77.773h35.714c8.074 0 14.643-6.569 14.643-14.643v-35.714c0-8.074-6.569-14.643-14.643-14.643h-35.714c-8.074 0-14.643 6.569-14.643 14.643v35.714c0 8.074 6.569 14.643 14.643 14.643zm.357-50h35v35h-35zm101.907 220.546c-.186-3.977-3.469-7.143-7.492-7.143-4.142 0-7.5 3.358-7.5 7.5 0 8.074 6.569 14.643 14.643 14.643h35.714c8.074 0 14.643-6.569 14.643-14.643v-35.714c0-8.074-6.569-14.643-14.643-14.643h-35.714c-8.074 0-14.643 6.569-14.643 14.643v10.3c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-9.943h35v35zm-102.264-77.773h35.714c8.074 0 14.643-6.569 14.643-14.643v-35.714c0-8.074-6.569-14.643-14.643-14.643h-35.714c-8.074 0-14.643 6.569-14.643 14.643v35.714c0 8.074 6.569 14.643 14.643 14.643zm.357-50h35v35h-35zm-.357 142.773h35.714c8.074 0 14.643-6.569 14.643-14.643v-35.714c0-8.074-6.569-14.643-14.643-14.643h-35.714c-8.074 0-14.643 6.569-14.643 14.643v35.714c0 8.074 6.569 14.643 14.643 14.643zm.357-50h35v35h-35z"
                      />
                    </g>
                  </svg>
                </span>
                <span>
                  {moment(query.check_in).format("DD MMMM YYYY")} -{" "}
                  {moment(query.check_out).format("DD MMMM YYYY")}
                </span>
              </div>
              <div className="adults">
                <span>2 Adults</span>
              </div>
            </div>
          ) : null}

          <div className="close-modal" onClick={handleClose}>
            <RxCross1 />
          </div>
        </div>
        <div className="modal-body-checkout w-100">
          {show.show == 2 ? (
            <div class="content">
              <div class="wrapper-1">
                <h6 className="bookingIdTextHeading">
                  Thank you, {values.username}! Your booking is now complete.
                </h6>
                <ul
                  className="ml-3 bookingIdText mt-3"
                  style={{ fontFamily: "Gotham Rounded Book" }}
                >
                  <li style={{ marginTop: "5px" }}>
                    <span style={{ color: "black" }}>
                      In the next 10 minutes, you will receive an email
                      containing your booking details.
                    </span>
                  </li>
                  <li style={{ marginTop: "5px" }}>
                    <span style={{ color: "black" }}>
                      Your Booking ID is {show.bookingDetails.BookingID[0]}.
                    </span>
                  </li>
                  <li style={{ marginTop: "5px" }}>
                    <span style={{ color: "black" }}>
                      Your Pin Code is {show.bookingDetails.PinCode[0]}.
                    </span>
                  </li>
                  <li style={{ marginTop: "5px" }}>
                    <span style={{ color: "black" }}>
                      Please present this information at the check-in.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              {RoomDetails.length !== 0 && show.show !== 2
                ? RoomDetails.map((rr, index) => {
                    var roomDetailsMAp = rooms.find(
                      (r) => r["RoomId"][0] == rr.roomID
                    );
                    // console.clear();
                    // console.log(roomDetailsMAp)
                    return (
                      <div key={index}>
                        {index !== 0 ? (
                          <hr className="my-4 room-details-container-right float-right"></hr>
                        ) : (
                          ""
                        )}
                        <div className="room-details-container d-lg-flex d-md-flex justify-content-lg-between justify-content-md-between w-100">
                          <div className="room-details-container-left">
                            <img
                              src={
                                roomDetailsMAp["RoomImages"][0]
                                  ? roomDetailsMAp["RoomImages"][0][
                                      "RoomImage"
                                    ][0]["$"]["Photo_Max500"]
                                  : ""
                              }
                            ></img>
                          </div>
                          <div className="room-details-container-right">
                            <div className="modal-heading mb-4">
                              {roomDetailsMAp["RoomName"]}
                            </div>
                            {roomDetailsMAp["RatePlanDetails"][0][
                              "RatePlans"
                            ].map((p, Ri) => {
                              return (
                                <div
                                  key={
                                    p["RatePlanId"][0] +
                                    "-" +
                                    p["RatePlanName"][0]
                                  }
                                >
                                  <RatePlan
                                    roomDetailsMAp={roomDetailsMAp}
                                    p={p}
                                    BookingDetails={BookingDetails}
                                    setBookingDetails={setBookingDetails}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}

              {show.show == 1 ? (
                <>
                  <hr className="my-5"></hr>
                  <form onSubmit={handleSubmit}>
                    <div className="form-container d-lg-flex justify-content-between w-100">
                      <div className="w-40 summary-container position-relative">
                        <div className="p-3">
                          <div className="modal-heading">Summary</div>
                          {/* {console.log(BookingDetails)} */}
                          {BookingDetails.plansDetail
                            ? BookingDetails.plansDetail.map((b, i) => {
                                return (
                                  <div
                                    className="d-flex justify-content-between mt-2"
                                    key={i}
                                  >
                                    <div>
                                      <div className="f-14 text-default text-default-bold">
                                        {b["RoomName"]}
                                      </div>
                                      <div className="f-13 text-default text-default-bold">
                                        {b.smallest["RatePlanName"]}
                                      </div>
                                      <div className="text-secondary-default f-12">
                                        Stay - {BookingDetails.nights} Nights
                                      </div>
                                    </div>
                                    <div className="f-13 text-default text-default-bold">
                                      {b.smallest["Rate"]} X {b.quantity} {b.smallest["RatePlanCurrencyCode"]}.
                                    </div>
                                  </div>
                                );
                              })
                            : ""}
                        </div>

                        <div className="total-div p-3">
                          <div className="d-flex justify-content-between">
                            <div className="f-14 text-default text-default-bold">
                              Total
                            </div>
                            <div className="f-14 text-default text-default-bold">
                              {BookingDetails.Total} {BookingDetails.plansDetail[0].smallest["RatePlanCurrencyCode"]}.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-60">
                        <div className="modal-heading mb-4">
                          Personal Details
                        </div>
                        <div className="row">
                          {inputs.map((input) => (
                            <div className="col-6 my-3">
                              <FormInputs
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                              />
                            </div>
                          ))}
                          <div className="col-12 my-3">
                            <textarea
                              rows="5"
                              placeholder="Any Special Request"
                              name="request"
                              value={values["request"]}
                              onChange={onChange}
                            ></textarea>
                          </div>
                          {BookingDetails.plansDetail.some(
                            (p) => p.smallest.RefundStatus[0] == 2
                          ) == false ? (
                            <div className="col-lg-12 col-md-12 col-sm-12 mt-12 position-relative mb-3">
                              <div className="d-flex align-items-center">
                                <label className="custom-checkbox-1">
                                  <input
                                    type="checkbox"
                                    name="isChecked"
                                    checked={values.isChecked}
                                    onChange={onChange}
                                  />
                                  <span></span>
                                </label>
                                <div
                                  className="roboto-regular f-15 mx-2"
                                  style={{ position: "relative" }}
                                >
                                  I don't have a credit card
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-5">
                      <button
                        type="submit"
                        class="btn btn--primary btn--medium mx-auto"
                      >
                        {show.loading ? (
                          <div class="spinner-grow" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          ""
                        )}
                        &nbsp;&nbsp;CONFIRM BOOKING
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <button
                    type="button"
                    class="btn btn--outline btn--fixed mx-2"
                    onClick={handleClose}
                  >
                    ADD MORE ROOMS
                  </button>
                  <button
                    type="button"
                    class="btn btn--primary btn--fixed mx-2"
                    onClick={() => setShow({ ...show, show: 1 })}
                  >
                    PROCEED
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function RatePlan({
  p,
  setBookingDetails,
  BookingDetails,
  roomDetailsMAp,
}) {
  var TofindQuantity = BookingDetails.plansDetail.find(
    (b) =>
      b["RoomId"][0] == roomDetailsMAp["RoomId"][0] &&
      b.smallest["RatePlanId"][0] == p["RatePlanId"][0]
  );
  const setbookingData = (q) => {
    if (q == 0) {
      var checkR = BookingDetails.plansDetail.filter(
        (b) => b.smallest["RatePlanId"][0] !== p["RatePlanId"][0]
      );
      console.log(checkR);
      setBookingDetails({
        ...BookingDetails,
        plansDetail: checkR,
        Total: checkR.reduce(function (tot, arr) {
          return tot + parseInt(arr.smallest["Rate"][0]) * arr.quantity;
        }, 0),
      });
    } else {
      var checkR = BookingDetails.plansDetail.find(
        (b) =>
          b["RoomId"][0] == roomDetailsMAp["RoomId"][0] &&
          b.smallest["RatePlanId"][0] == p["RatePlanId"][0]
      );
      if (checkR) {
        BookingDetails.plansDetail[
          BookingDetails.plansDetail.indexOf(checkR)
        ].quantity = q;
        setBookingDetails({
          ...BookingDetails,
          plansDetail: BookingDetails.plansDetail,
          Total: BookingDetails.plansDetail.reduce(function (tot, arr) {
            return tot + parseInt(arr.smallest["Rate"][0]) * arr.quantity;
          }, 0),
        });
      } else {
        BookingDetails.plansDetail.push({
          ...roomDetailsMAp,
          smallest: p,
          quantity: q,
        });
        setBookingDetails({
          ...BookingDetails,
          plansDetail: BookingDetails.plansDetail,
          Total: BookingDetails.plansDetail.reduce(function (tot, arr) {
            return tot + parseInt(arr.smallest["Rate"][0]) * arr.quantity;
          }, 0),
        });
      }
    }
  };
  const [dropdown, setdropdown] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    console.clear();
    document.addEventListener("click", handleClickOutSideDropdown);
    return () => {
      document.removeEventListener("click", handleClickOutSideDropdown);
    };
  }, []);

  const handleClickOutSideDropdown = (e) => {
    //console.log(dropdownRef);
    if (dropdownRef.current) {
      if (dropdown && !dropdownRef.current.contains(e.target)) {
        setdropdown(false);
      }
    }
  };
  window.addEventListener("click", handleClickOutSideDropdown);
  return (
    <div className="rate-plan-details d-flex justify-content-between align-items-center mb-5">
      <div className="refud-non-refund">
        <div className="f-14 text-uppercase text-default-bold">
          {p["RatePlanName"]}
        </div>
        <div className="f-13 text-default text-bold">
          {p["RatePlanCurrencyCode"]}{" "}
          {p["RateDetailsByDate"][0]["RatePerDate"][0]["$"]["Rate"]} / night
        </div>
      </div>
      <div className="d-flex align-items-center">
        <div className="drop-down-container mx-3">
          {Array.apply(null, {
            length: p["MaxPerson"] ? Number(p["MaxPerson"][0]) : 0,
          })
            .map(Number.call, Number)
            .map((item) => {
              return (
                <svg
                  key={item}
                  className="me-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 7.23 17.54"
                >
                  <defs></defs>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        class="cls-1"
                        d="M1.9,5.86H1.49V6c0,1.16,0,2.33,0,3.49a.79.79,0,0,1-.58.69.71.71,0,0,1-.78-.32A.66.66,0,0,1,0,9.57c0-.38,0-.76,0-1.14v-3A2,2,0,0,1,1.14,3.64a1.38,1.38,0,0,1,.69-.19H5.24a2,2,0,0,1,1.9,1.38,1,1,0,0,1,.07.34c0,1.43,0,2.86,0,4.29a.73.73,0,0,1-.91.71.68.68,0,0,1-.52-.64q0-.75,0-1.5V5.86H5.33V6c0,3.64,0,7.27,0,10.91a.63.63,0,0,1-.38.55A.74.74,0,0,1,4,17.25a.35.35,0,0,1-.07-.2c0-.34-.05-.68-.05-1,0-1.71,0-3.42,0-5.13v-.18H3.41v.12c0,1.77,0,3.54,0,5.32,0,.24,0,.48,0,.72a.65.65,0,0,1-.47.6.67.67,0,0,1-.73-.15.7.7,0,0,1-.25-.56c0-1.5,0-3,0-4.51V5.86Z"
                      />
                      <path
                        class="cls-1"
                        d="M2.21,1.42A1.41,1.41,0,0,1,3.69,0,1.44,1.44,0,0,1,5,1.11a1.4,1.4,0,0,1-.73,1.56,1.41,1.41,0,0,1-2-.82A3.15,3.15,0,0,1,2.21,1.42Z"
                      />
                    </g>
                  </g>
                </svg>
              );
            })}
          {dropdown ? (
            <div class="dropdown">
              <div class="dropdown-content">
                {Array.apply(null, {
                  length: p["NoOfRoomsAvailable"][0]
                    ? Number(p["NoOfRoomsAvailable"][0]) + 1
                    : 0,
                })
                  .map(Number.call, Number)
                  .map((item) => {
                    return (
                      <a key={item} onClick={() => setbookingData(item)}>
                        Room {item}
                      </a>
                    );
                  })}
              </div>
            </div>
          ) : null}
        </div>

        <div
          className="drop-down-room"
          onClick={() => setdropdown(!dropdown)}
          ref={dropdownRef}
        >
          <div>Rooms</div>
          <div className="drop-down-icon">
            <span>{TofindQuantity ? TofindQuantity.quantity : 0}</span>
            {dropdown ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-chevron-up"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export function RoomInformationModal({ roomInfoModal }) {
  //console.log(roomInfoModal);
  return (
    <div className="roomDescription">
      <div className="roomImageContainer">
        <div className="roomImageContainerItem1">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            pagination={{ clickable: true }}
            className="RoomImageSwiper"
          >
            {roomInfoModal.rooms["RoomImages"][0]
              ? roomInfoModal.rooms["RoomImages"][0]["RoomImage"].map(
                  (roomImage, index) => {
                    return (
                      <SwiperSlide
                        style={{
                          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${roomImage["$"]["Photo_Max500"]})`,
                        }}
                      ></SwiperSlide>
                    );
                  }
                )
              : null}
          </Swiper>
        </div>
        <div className="roomImageContainerItem2">
          <div>
            <div className="modal-heading mb-2em">
              {roomInfoModal.rooms["RoomName"]}
            </div>

            <div className="font-18 color-secondary">
              <CheckPerson number={roomInfoModal.smallest["MaxPerson"][0]} />
              &nbsp;{roomInfoModal.smallest["MaxPerson"][0]} Person
            </div>
            <div className="font-18 my-3 bed-container">
              <Bed /> {roomInfoModal.rooms["BedSize"]}
            </div>
            <div className="font-18 my-3">
              <span className="bold">
                {roomInfoModal.smallest["CurrencyCode"]}{" "}
                {roomInfoModal.smallest["Rate"][0]}
              </span>{" "}
              / night
            </div>
            <Button buttonStyle="btn--primary" buttonSize="btn--medium">
              BOOK NOW
            </Button>
          </div>
        </div>
      </div>
      <div className="my-5 overview-container">
        <div className="modal-heading">Overview</div>
        <div className="room-description font-18">
          {roomInfoModal.rooms.RoomDescription}
        </div>
      </div>
      <div className="my-5">
        <div className="modal-heading text-center">explore amenities</div>
        <div className="room-amenities-grid">
          <div className="amenites-grid-item">
            <FreeWifi />
            <div className="amenites-grid-item-des">Free Wifi</div>
          </div>
          <div className="amenites-grid-item">
            <Microwave />
            <div className="amenites-grid-item-des">Television</div>
          </div>
          <div className="amenites-grid-item">
            <AirCondition />
            <div className="amenites-grid-item-des">AC / Heater</div>
          </div>
          <div className="amenites-grid-item">
            <RoomServices />
            <div className="amenites-grid-item-des">Rooms Service</div>
          </div>
          {/* <div className="amenites-grid-item">
                        <NoSMoking />
                        <div className='amenites-grid-item-des'>No Smoking</div>

                    </div> */}
          {/* <div className="amenites-grid-item">
                        <Pet />
                        <div className='amenites-grid-item-des'>Pet Friendly</div>
                    </div> */}
          {/* <div className="amenites-grid-item">
                        <Family />
                        <div className='amenites-grid-item-des'>Family Rooms</div>
                    </div>
                    <div className="amenites-grid-item">
                        <Disabled />
                        <div className='amenites-grid-item-des'>Facilities</div>
                    </div>
                    <div className="amenites-grid-item">
                        <Fridge />
                        <div className='amenites-grid-item-des'>Mini-fridge</div>
                    </div>
                    <div className="amenites-grid-item">
                        <Microwave />
                        <div className='amenites-grid-item-des'>Microwave</div>
                    </div> */}
        </div>
      </div>
    </div>
  );
}
