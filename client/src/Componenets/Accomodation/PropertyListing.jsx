import React from 'react'
import Accomodation from "./Accomodation";
import Divider from "../BasicUtillities/Divider";

function PropertyListing({query, setquery}) {
  return (
    <div className='my-5'>
        <Accomodation query={query} setquery={setquery} Accomodationid='13504' title="Heritage Rooms"/>
        <Divider />
        <Accomodation query={query} setquery={setquery} Accomodationid='13295' title="Studio Rooms"/>
    </div>
  )
}

export default PropertyListing