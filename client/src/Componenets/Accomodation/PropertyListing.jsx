import React from "react";
import Accomodation from "./Accomodation";
import Divider from "../BasicUtillities/Divider";

function PropertyListing({ query, setquery }) {
  return (
    <div className="my-5">
      <div id="accomodation">
        <Accomodation
          query={query}
          setquery={setquery}
          Accomodationid="13504"
          title="Heritage Rooms"
        />
      </div>
      <Divider />
      <div id="accomodation1">
        <Accomodation
          query={query}
          setquery={setquery}
          Accomodationid="13295"
          title="Studio Rooms"
        />
      </div>
    </div>
  );
}

export default PropertyListing;
