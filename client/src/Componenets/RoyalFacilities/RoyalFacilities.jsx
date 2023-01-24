import React from 'react';
import { ReactComponent as Birthday } from '../../images/c_images/birthday-cake-celebration-festival-party-svgrepo-com.svg';
import { ReactComponent as Business } from '../../images/c_images/businessmen-having-a-group-conference-svgrepo-com.svg';
import { ReactComponent as Weddings } from '../../images/c_images/wedding-rings-jewelry-svgrepo-com.svg';
import { ReactComponent as Guest } from '../../images/c_images/dining.svg';
import { ReactComponent as BbqLodge } from '../../images/c_images/bbq-svgrepo-com.svg';
import { ReactComponent as CofeeShop } from '../../images/c_images/coffee-cup-festival-svgrepo-com.svg';


function RoyalFacilities({ amen }) {
  return (
    <div className="main-container RoyalFacilities">
      <div className="inner-container">
        {/* <span className='font-20'>{amen.sunTitle}</span> */}
        <h2>{amen.title}</h2>
        <div className="Facilities-Icon">
          <div className="Facilities-Icon-Container">
            <div className='facilities'>
              <div className='amenitiesTitle'>COFFEE SHOP</div>
              <div className="facilities-inner-icon svgicon">
                <CofeeShop />
              </div>
            </div>
            <div className='facilities'>
              <div className='amenitiesTitle'>B.B.Q LOUNGE</div>
              <div className="facilities-inner-icon svgicon1">
                <BbqLodge />
              </div>
            </div>
            <div className='facilities'>
              <div className='amenitiesTitle'>MEHMAN KHANA</div>
              <div className="facilities-inner-icon svgicon">
                <Guest />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
export function Events() {
  return (
    <div className="main-container RoyalFacilities-events mt-5">
      <div className="inner-container">
        {/* <span className='font-20'>CELEBERATIONS</span> */}
        <h2>Events & Meetings</h2>
        <div className="Facilities-Icon">
          <div className="Facilities-Icon-Container">
            <div className='facilities'>
              <div className='amenitiesTitle'>WEDDINGS</div>
              <div className="facilities-inner-icon svgicon">
                <Weddings />
              </div>
            </div>
            <div className='facilities'>
              <div className='amenitiesTitle'>MEETINGS</div>
              <div className="facilities-inner-icon svgicon">
                <Business />
              </div>
            </div>
            <div className='facilities'>
              <div className='amenitiesTitle'>BIRTHDAYS</div>
              <div className="facilities-inner-icon svgicon">
                <Birthday />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default RoyalFacilities
