import React, { useRef, useState, useEffect } from "react";
import Calendar from "react-calendar";
import Calendaricon from '../../images/calendar.svg'
import { Button } from "../Button/Button";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { addDays } from 'date-fns';
import moment from 'moment';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { isMobile } from 'react-device-detect';


function HeaderBook({ setquery, query }) {
  const [bookData, setBookData] = useState({
    check_in: moment(),
    check_out: moment().add('2', 'days'),
    adults: 2,
    rooms: 1,
    state: [{
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection'
    }],
    setCalander: false,
    setCalander1: false,
    showadultDropdown: false,
    showroomsDropdown: false,
    showchildernDropdown: false
  })

  const check_inRef = useRef(null);
  const check_inRef1 = useRef(null);
  const [Children, setChildren] = useState(0);

  useEffect(() => {
    document.addEventListener('click', handleClickOutSideDropdown);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutSideDropdown);
    };

  }, [bookData]);




  const handleClickOutSideDropdown = (e) => {
    // if (bookData.setCalander && !check_inRef.current.contains(e.target)) {
    //   setBookData({ ...bookData, setCalander: check_inRef.current.contains(e.target), setCalander1: check_inRef1.current.contains(e.target) });
    // }
    // if (bookData.setCalander1 && !check_inRef1.current.contains(e.target)) {
    //   setBookData({ ...bookData, setCalander: check_inRef.current.contains(e.target), setCalander1: check_inRef1.current.contains(e.target) });

    // }
    getClickPosition(e)
  }

  const handleIncrement = (operation) => {
    if (operation == "add") {
      setBookData({ ...bookData, adults: bookData.adults + 1 });

    } else if (operation == "sub" && bookData.adults > 1) {
      setBookData({ ...bookData, adults: bookData.adults - 1 });

    }
  }

  const handleIncrementrooms = (operation) => {
    if (operation == "add") {
      setBookData({ ...bookData, rooms: bookData.rooms + 1 });

    } else if (operation == "sub" && bookData.rooms > 1) {
      setBookData({ ...bookData, rooms: bookData.rooms - 1 });

    }
  }
  const handleIncrementChildren = (operation) => {
    if (operation == "add") {
      setChildren(Children + 1);

    } else if (operation == "sub" && Children > 0) {
      setChildren(Children - 1);

    }
  }
  const sendData = () => {
    setquery({
      ...query,
      adults: bookData.adults,
      check_in: moment(bookData.state[0].startDate).format("YYYY-MM-DD"),
      check_out: moment(bookData.state[0].endDate).format("YYYY-MM-DD"),
      rooms: bookData.rooms,
      child: Children,
      AccomodationLoading: true,
    })

  }


  function getClickPosition(e) {
    var cala = document.querySelector("#searchData1");
    var theThing = document.querySelector("#counter-dropdown");
    // console.log(e.target.className)
    if (typeof e.target.className == 'string') {
      if (e.target.className.includes('room-input')) {
        theThing.style.display = 'block';
        theThing.classList.remove('adults-move', 'child-move');
        theThing.classList.add('room-move');
      }
      else if (e.target.className.includes('adults-input')) {
        theThing.style.display = 'block';
        theThing.classList.remove('room-move', 'child-move');
        theThing.classList.add('adults-move');
      }
      else if (e.target.className.includes('child-input')) {
        theThing.style.display = 'block';
        theThing.classList.remove('room-move', 'adults-move');
        theThing.classList.add('child-move');
      } else {
        if (e.srcElement.parentNode) {
          if (typeof e.srcElement.parentNode.className == 'string') {
            if (!e.srcElement.parentNode.className.includes('dropIcon1')) {
              theThing.style.display = 'none'
            } else {
              theThing.style.display = 'block';

            }
          }
        }

      }
    }

    if (e.target.className.includes("Check-in")) {
      cala.style.display = 'block';
      cala.classList.remove('showCalendar1');
      cala.classList.add('showCalendar');
    }
    else if (e.target.className.includes("Check-Out")) {
      cala.style.display = 'block';
      cala.classList.remove('showCalendar');
      cala.classList.add('showCalendar1');
    } 
    // else {
    //   if (check_inRef.current.contains(e.target)) {
    //     cala.style.display = 'block';
    //   } else {
    //     cala.style.display = 'none';

    //   }
    //   //document.querySelector("#searchData1").style.display = 'none';
    // }

  }

  function DropdownContainer() {
    return (
      <div className="counter-dropdown adults-move" id="counter-dropdown">
        <ul>
          <li className="dropIcon1">
            <b>{bookData.adults}</b>&nbsp;&nbsp;&nbsp;Adults</li>
          <li className="dropIcon1">
            <span className="dropIcon" onClick={() => handleIncrement("add")}><AiOutlinePlusCircle /></span>
            <b className="mx-4">{bookData.adults}</b>
            <span className="dropIcon" onClick={() => handleIncrement("sub")}><AiOutlineMinusCircle /></span></li>
        </ul>
        <ul>
          <li className="dropIcon1"><b>{bookData.rooms}</b>&nbsp;&nbsp;&nbsp;Rooms</li>
          <li className="dropIcon1">
            <span className="dropIcon" onClick={() => handleIncrementrooms("add")}><AiOutlinePlusCircle /></span>
            <b className="mx-4">{bookData.rooms}</b>
            <span className="dropIcon" onClick={() => handleIncrementrooms("sub")}><AiOutlineMinusCircle /></span>
          </li>
        </ul>
        <ul>
          <li className="dropIcon1"><b>{Children}</b>&nbsp;&nbsp;&nbsp;Children</li>
          <li className="dropIcon1"><span className="dropIcon" onClick={() => handleIncrementChildren("add")}><AiOutlinePlusCircle /></span><b className="mx-4">{Children}</b><span className="dropIcon" onClick={() => handleIncrementChildren("sub")}><AiOutlineMinusCircle /></span>
          </li>
        </ul>
      </div>)
  }


  return (
    <div className="book-Now ">
      <div className="bookNow-container">
        <div className="text_div">
          <h3>
            BOOK NOW
          </h3>
        </div>

        <div className="form_div form-container">
          <form className="form-wrapper">
            {/* <div className="form-column" > */}
            <div className="input-content-wrapper">
              <div className="input-wrapper position-relitive" onClick={() => { setBookData({ ...bookData, setCalander: !bookData.setCalander }) }}>
                <input
                  value={moment(bookData.check_in).format('MMM Do YYYY')}
                  placeholder="Check-in" className="form-input-container Check-in"
                  disabled
                />
                <div className="input-wrapper-left-image">
                  <span>Check-in</span>
                  <img src={Calendaricon} alt="Calendaricon"></img>
                </div>
              </div>

            </div>
     {/* <div className="form-column"> */}
            <div className="input-content-wrapper  position-relitive">
              <div className="input-wrapper position-relitive" onClick={getClickPosition}>
                <span className="input-span adults-input">Adults</span>
                <input type="text" className="select-input adults-input" value={bookData.adults} id="adults-input" disabled />
              </div>
            </div>
                {/* </div> */}
            {/* <div className="form-column"> */}
            <div className="input-content-wrapper position-relitive">
                <div className="input-wrapper position-relitive" onClick={getClickPosition}>
                  <span className="input-span room-input">No of Rooms</span>
                  <input type="text" className="select-input room-input" id="room-input" value={bookData.rooms} disabled />
                </div>
              </div>

            <div className="input-content-wrapper" ref={check_inRef1}>
              <div className="input-wrapper position-relitive" onClick={() => { setBookData({ ...bookData, setCalander1: !bookData.setCalander1 }) }}>
                <input
                  value={moment(bookData.check_out).format('MMM Do YYYY')}
                  placeholder="Check-out" className="form-input-container Check-Out"
                  disabled
                />
                <div className="input-wrapper-left-image">
                  <span>Check-out</span>
                  <img src={Calendaricon} alt="Calendaricon"></img>
                </div>
              </div>
            </div>

            <div className="showCalendar position-absolute search-detail z-index-999 border-radius p-2 center-cal bg-white" id="searchData1">
              <DateRange
                onChange={item => {
                  if (item.selection.endDate.getTime() == item.selection.startDate.getTime()) {
                    setBookData({ ...bookData, state: [item.selection], check_in: item.selection.startDate, check_out: item.selection.endDate })
                    document.querySelector("#searchData1").style.display = 'block';

                  } else {
                    setBookData({ ...bookData, state: [item.selection], check_in: item.selection.startDate, check_out: item.selection.endDate })
                    document.querySelector("#searchData1").style.display = 'none';

                  }

                }}
                rangeColors={['#F4CD04']}
                moveRangeOnFirstSelection={false}
                dragSelectionEnabled={false}
                ranges={bookData.state}
                showDateDisplay={false}
                months={isMobile ? 1 : 2}
                minDate={new Date()}
                direction={isMobile ? "vertical" : "horizontal"}
              />
            </div>
            {/* </div> */}

       
            <div className="input-content-wrapper position-relitive">
              <div className="input-wrapper position-relitive" onClick={getClickPosition}>
                <span className="input-span child-input">Select Property</span>
                <input type="text" className="select-input child-input" id="child-input" value={Children} disabled />
              </div>
            </div>
        
              <div className="input-content-wrapper">
                <Link to="/" className='mt-lg-5'>
                  <Button buttonStyle="btn--primary" buttonSize="btn--wide" onClick={() => sendData()}>
                    CHECK AVAILABILITY
                  </Button>
                </Link>
              </div>
            {/* </div> */}
            <DropdownContainer />

          </form>
        </div>
      </div >
    </div >
  );
}


export default HeaderBook;
