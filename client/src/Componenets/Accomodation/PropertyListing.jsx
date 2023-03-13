import React, { useEffect, useState } from "react";
import Accomodation from "./Accomodation";
import Divider from "../BasicUtillities/Divider";

function PropertyListing({ query, setquery }) {
  const [Studiorooms, setStudiorooms] = useState([]);
  const [heritageRoom, setheritageRoom] = useState([]);
  const [ErrorMSg, setErrorMSg] = useState("");

  useEffect(() => {
    //  console.log(query.check_in)
    fetch("/api/getRooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postID: 13295,
        postCheckIn: query.check_in,
        postCheckOut: query.check_out,
      }),
    })
      .then((roomsDetails) => {
        // console.log(roomsDetails);
        if (!roomsDetails.ok) {
          throw Error("could not fetch the data for that resorce");
        }
        return roomsDetails.json();
      })
      .then((roomsDetailsJSon) => {
        //console.log(roomsDetailsJSon);
        if (roomsDetailsJSon["Success"]) {
        
          setStudiorooms(
            roomsDetailsJSon["Success"]["Result"][0]["HotelRooms"].filter((r) =>
              r["RoomName"][0].toLowerCase().includes("studio")
            )
          );
          setheritageRoom(
            roomsDetailsJSon["Success"]["Result"][0]["HotelRooms"].filter((r) =>
              !r["RoomName"][0].toLowerCase().includes("studio")
            )
          );
        } else {
          //console.log(roomsDetailsJSon["Availability"]["Message"][0]);
          setErrorMSg(roomsDetailsJSon["Availability"]["Message"][0]);
        }
        // console.log(roomsDetailsJSon['Success']['Result'][0]['HotelRooms']);
        setquery({ ...query, AccomodationLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query.AccomodationLoading]);

  return (
    <div className="my-5">
      <div id="accomodation">
        <Accomodation
          query={query}
          setquery={setquery}
          Accomodationid="13295"
          title="Heritage Rooms"
          rooms={heritageRoom}
          ErrorMSg={ErrorMSg}
        />
      </div>
      <Divider />
      <div id="accomodation1">
        <Accomodation
          query={query}
          setquery={setquery}
          Accomodationid="13295"
          title="Studio Rooms"
          rooms={Studiorooms}
          ErrorMSg={ErrorMSg}
        />
      </div>
    </div>
  );
}

export default PropertyListing;
