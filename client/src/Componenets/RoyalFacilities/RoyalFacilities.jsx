import React from 'react';
import { ReactComponent as Birthday } from '../../images/c_images/birthday-cake-celebration-festival-party-svgrepo-com.svg';
import { ReactComponent as Business } from '../../images/c_images/businessmen-having-a-group-conference-svgrepo-com.svg';
import { ReactComponent as Weddings } from '../../images/c_images/wedding-rings-jewelry-svgrepo-com.svg';
import { ReactComponent as Guest } from '../../images/c_images/dining.svg';
import { ReactComponent as BbqLodge } from '../../images/c_images/bbq-svgrepo-com.svg';
import { ReactComponent as CofeeShop } from '../../images/c_images/coffee-cup-festival-svgrepo-com.svg';


function RoyalFacilities({ amen }) {
  return (
    <div className="main-container RoyalFacilities" id='dining'>
      <div className="inner-container">
        {/* <span className='font-20'>{amen.sunTitle}</span> */}
        <h2>{amen.title}</h2>
        <div className="Facilities-Icon">
          <div className="Facilities-Icon-Container">
            <a href='https://goo.gl/maps/5eBMD4jr2BhYXvP97' className='facilities' target="_blank" rel="noreferrer">
              <div className='amenitiesTitle'>VICTORIA CAFÉ</div>
              <div className="facilities-inner-icon svgicon">
                <CofeeShop />
              </div>
            </a>
            
            <a href='https://goo.gl/maps/5eBMD4jr2BhYXvP97' className='facilities' target="_blank" rel="noreferrer">
              <div className='amenitiesTitle'>ROSE GARDEN BBQ</div>
              <div className="facilities-inner-icon svgicon1">
                <BbqLodge />
              </div>
            </a>
            <a href='https://goo.gl/maps/5eBMD4jr2BhYXvP97' className='facilities' target="_blank" rel="noreferrer">
              <div className='amenitiesTitle'>MEHMAN KHANA</div>
              <div className="facilities-inner-icon svgicon">
                <Guest />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div >
  );
}
export function Events() {
  return (
    <div className="main-container RoyalFacilities-events mt-5" id='events'>
      <div className="inner-container">
        {/* <span className='font-20'>CELEBERATIONS</span> */}
        <h2>Heritage Events & Celebrations</h2>
        <div className="Facilities-Icon">
          <div className="Facilities-Icon-Container">
            <a href='https://goo.gl/maps/5eBMD4jr2BhYXvP97' className='facilities' target="_blank" rel="noreferrer">
              <div className='amenitiesTitle'>WEDDINGS</div>
              <div className="facilities-inner-icon svgicon">
                <Weddings />
              </div>
            </a>
            <a href='https://goo.gl/maps/5eBMD4jr2BhYXvP97' className='facilities' target="_blank" rel="noreferrer">
              <div className='amenitiesTitle'>MEETINGS</div>
              <div className="facilities-inner-icon svgicon">
                <Business />
              </div>
            </a>
            <a href='https://goo.gl/maps/5eBMD4jr2BhYXvP97' className='facilities' target="_blank" rel="noreferrer">
              <div className='amenitiesTitle'>BIRTHDAYS</div>
              <div className="facilities-inner-icon svgicon">
                <Birthday />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div >
  )
}

export default RoyalFacilities
