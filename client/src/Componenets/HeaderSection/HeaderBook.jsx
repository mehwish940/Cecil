import React, { useRef, useState, useEffect } from "react";
import Calendar from "react-calendar";
import Calendaricon from "../../images/calendar.svg";
import { Button } from "../Button/Button";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { addDays } from "date-fns";
import moment from "moment";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { isMobile } from "react-device-detect";
import OutsideClickHandler from "react-outside-click-handler";

function HeaderBook({ setquery, query }) {
  const [bookData, setBookData] = useState({
    check_in: "",
    check_out: "",
    adults: 2,
    rooms: 1,
    child: 0,
    property: "",
    state: [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 2),
        key: "selection",
      },
    ],
    setCalander: false,
    showadultDropdown: false,
    showroomsDropdown: false,
    ShowPropertyDrop: false,
  });

  const sendData = (e) => {
    e.preventDefault();
    e.stopPropagation();
    bookData.property == "Heritage Rooms"
      ? document.getElementById("accomodation").scrollIntoView()
      : document.getElementById("accomodation1").scrollIntoView();
    setquery({
      ...query,
      adults: bookData.adults,
      check_in: moment(bookData.state[0].startDate).format("YYYY-MM-DD"),
      check_out: moment(bookData.state[0].endDate).format("YYYY-MM-DD"),
      rooms: bookData.rooms,
      AccomodationLoading: true,
    });
  };

  return (
    <div className="book-Now ">
      <div className="bookNow-container">
        <div className="text_div">
          <h3>BOOK NOW</h3>
        </div>

        <div className="form_div form-container">
          <form className="form-wrapper">
            {/* <div className="form-column" > */}
            <div className="input-content-wrapper">
              <OutsideClickHandler
                onOutsideClick={() => {
                  setBookData({
                    ...bookData,
                    setCalander: false,
                  });
                }}
              >
                <div
                  className="input-wrapper position-relitive"
                  onClick={() => {
                    setBookData({
                      ...bookData,
                      setCalander: !bookData.setCalander,
                    });
                  }}
                >
                  <div className="form-input-container Check-in">
                    {bookData.check_in
                      ? moment(bookData.check_in).format("MMM Do YYYY")
                      : "Check-in"}
                  </div>
                  <div className="input-wrapper-left-image">
                    <img src={Calendaricon} alt="Calendaricon"></img>
                  </div>
                </div>
                {bookData.setCalander ? (
                  <div
                    className="showCalendar position-absolute search-detail z-index-999 border-radius p-2 center-cal bg-white"
                    id="searchData1"
                  >
                    <DateRange
                      onChange={(item) => {
                        if (
                          item.selection.endDate.getTime() ==
                          item.selection.startDate.getTime()
                        ) {
                          setBookData({
                            ...bookData,
                            state: [item.selection],
                            check_in: item.selection.startDate,
                            check_out: item.selection.endDate,
                          });
                        } else {
                          setBookData({
                            ...bookData,
                            state: [item.selection],
                            check_in: item.selection.startDate,
                            check_out: item.selection.endDate,
                            setCalander: false,
                          });
                        }
                      }}
                      rangeColors={["#D1AA65"]}
                      moveRangeOnFirstSelection={false}
                      dragSelectionEnabled={false}
                      ranges={bookData.state}
                      showDateDisplay={false}
                      months={isMobile ? 1 : 2}
                      minDate={new Date()}
                      direction={isMobile ? "vertical" : "horizontal"}
                    />
                  </div>
                ) : null}
              </OutsideClickHandler>
            </div>
            <div className="input-content-wrapper">
              <div
                className="input-wrapper position-relitive"
                onClick={() => {
                  setBookData({
                    ...bookData,
                    setCalander: !bookData.setCalander,
                  });
                }}
              >
                <div className="form-input-container Check-in">
                  {bookData.check_out
                    ? moment(bookData.check_out).format("MMM Do YYYY")
                    : "Check-out"}
                </div>
                <div className="input-wrapper-left-image">
                  <img src={Calendaricon} alt="Calendaricon"></img>
                </div>
              </div>
            </div>
            <div className="input-content-wrapper position-relitive">
              <OutsideClickHandler
                onOutsideClick={() => {
                  setBookData({
                    ...bookData,
                    ShowPropertyDrop: false,
                  });
                }}
              >
                <div
                  className="input-wrapper position-relitive"
                  onClick={() => {
                    setBookData({
                      ...bookData,
                      ShowPropertyDrop: !bookData.ShowPropertyDrop,
                    });
                  }}
                >
                  <div className="select-input child-input">
                    {bookData.property ? bookData.property : "Select Wing"}
                  </div>
                </div>
                {bookData.ShowPropertyDrop ? (
                  <div className="counter-dropdown-1">
                    <ul>
                      <li
                        onClick={() => {
                          setBookData({
                            ...bookData,
                            property: "Heritage Rooms",
                            ShowPropertyDrop: false,
                          });
                        }}
                      >
                        Heritage Rooms
                      </li>
                      <li
                        onClick={() => {
                          setBookData({
                            ...bookData,
                            property: "Studio Rooms",
                            ShowPropertyDrop: false,
                          });
                        }}
                      >
                        Studio Rooms
                      </li>
                    </ul>
                  </div>
                ) : null}
              </OutsideClickHandler>
            </div>
            {/* <div className="form-column"> */}
            <div className="input-content-wrapper  position-relitive">
              <OutsideClickHandler
                onOutsideClick={() => {
                  setBookData({
                    ...bookData,
                    showadultDropdown: false,
                  });
                }}
              >
                <div
                  className="input-wrapper position-relitive"
                  onClick={() => {
                    setBookData({
                      ...bookData,
                      showadultDropdown: !bookData.showadultDropdown,
                    });
                  }}
                >
                  <div className="select-input adults-input">
                    <div>Adults - Children</div>
                    <div className="me-5"> {bookData.adults}</div>
                  </div>
                </div>
                {bookData.showadultDropdown ? (
                  <DropdownContainer
                    bookData={bookData}
                    setBookData={setBookData}
                  />
                ) : null}
              </OutsideClickHandler>
            </div>

            <div className="input-content-wrapper position-relitive">
              <OutsideClickHandler
                onOutsideClick={() => {
                  setBookData({
                    ...bookData,
                    showroomsDropdown: false,
                  });
                }}
              >
                <div
                  className="input-wrapper position-relitive"
                  onClick={() => {
                    setBookData({
                      ...bookData,
                      showroomsDropdown: !bookData.showroomsDropdown,
                    });
                  }}
                >
                  <div className="select-input room-input">
                    <div>No of Rooms</div>
                    <div className="me-5">{bookData.rooms}</div>
                  </div>
                </div>
                {bookData.showroomsDropdown ? (
                  <DropdownRoomContainer
                    bookData={bookData}
                    setBookData={setBookData}
                  />
                ) : null}
              </OutsideClickHandler>
            </div>

            <div className="input-content-wrapper">
              <button
                buttonStyle="btn--primary"
                buttonSize=""
                onClick={sendData}
                className="h-100 w-100 btn--primary"
              >
                CHECK AVAILABILITY
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function DropdownContainer({ bookData, setBookData }) {
  const handleIncrement = (operation) => {
    if (operation == "add") {
      setBookData({ ...bookData, adults: bookData.adults + 1 });
    } else if (operation == "sub" && bookData.adults > 1) {
      setBookData({ ...bookData, adults: bookData.adults - 1 });
    }
  };
  const handlechildIncrement = (operation) => {
    if (operation == "add") {
      setBookData({ ...bookData, child: bookData.child + 1 });
    } else if (operation == "sub" && bookData.child > 1) {
      setBookData({ ...bookData, child: bookData.child - 1 });
    }
  };
  const handleIncrementrooms = (operation) => {
    if (operation == "add") {
      setBookData({ ...bookData, rooms: bookData.rooms + 1 });
    } else if (operation == "sub" && bookData.rooms > 1) {
      setBookData({ ...bookData, rooms: bookData.rooms - 1 });
    }
  };
  return (
    <div className="counter-dropdown-2 py-3" id="counter-dropdown">
      <ul className="d-flex justify-content-between">
        <li className="dropIcon1">Adults</li>
        <li className="dropIcon1">
          <span className="dropIcon" onClick={() => handleIncrement("add")}>
            <AiOutlinePlusCircle />
          </span>
          <b className="mx-4">{bookData.adults}</b>
          <span className="dropIcon" onClick={() => handleIncrement("sub")}>
            <AiOutlineMinusCircle />
          </span>
        </li>
      </ul>
      <ul className="d-flex justify-content-between">
        <li className="dropIcon1">Childern</li>
        <li className="dropIcon1">
          <span
            className="dropIcon"
            onClick={() => handlechildIncrement("add")}
          >
            <AiOutlinePlusCircle />
          </span>
          <b className="mx-4">{bookData.child}</b>
          <span
            className="dropIcon"
            onClick={() => handlechildIncrement("sub")}
          >
            <AiOutlineMinusCircle />
          </span>
        </li>
      </ul>
    </div>
  );
}

export function DropdownRoomContainer({ bookData, setBookData }) {
  const handleIncrement = (operation) => {
    if (operation == "add") {
      setBookData({ ...bookData, adults: bookData.adults + 1 });
    } else if (operation == "sub" && bookData.adults > 1) {
      setBookData({ ...bookData, adults: bookData.adults - 1 });
    }
  };

  const handleIncrementrooms = (operation) => {
    if (operation == "add") {
      setBookData({ ...bookData, rooms: bookData.rooms + 1 });
    } else if (operation == "sub" && bookData.rooms > 1) {
      setBookData({ ...bookData, rooms: bookData.rooms - 1 });
    }
  };
  return (
    <div className="counter-dropdown py-3" id="counter-dropdown">
      <ul>

        <li className="dropIcon1">
          <span
            className="dropIcon"
            onClick={() => handleIncrementrooms("add")}
          >
            <AiOutlinePlusCircle />
          </span>
          <b className="mx-4">{bookData.rooms}</b>
          <span
            className="dropIcon"
            onClick={() => handleIncrementrooms("sub")}
          >
            <AiOutlineMinusCircle />
          </span>
        </li>
      </ul>
    </div>
  );
}

export default HeaderBook;
