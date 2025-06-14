import React from 'react';
import './ServicedBy.css';

import l1 from '../../assets/logos/l1.png';
import l2 from '../../assets/logos/l2.png';
import l3 from '../../assets/logos/l3.png';
import l4 from '../../assets/logos/l4.png';
import l5 from '../../assets/logos/l5.png';
import l6 from '../../assets/logos/l6.png';
import l7 from '../../assets/logos/l7.png';
import l8 from '../../assets/logos/l8.png';
import l9 from '../../assets/logos/l9.png';

const logos = [l1, l2, l3, l4, l5, l6, l7, l8, l9];

const ServicedBy = () => {
  return (
    <div className="serviced-by-container">

      <div className="serviced-by-scroll-wrapper">
        <div className="serviced-by-track">
          {logos.concat(logos).map((logo, index) => (
            <img key={index} src={logo} alt={`Logo ${index}`} />
          ))}
        </div>
        <h2 className="serviced-by-title">SERVICED BY</h2>
      </div>
    </div>
  );
};

export default ServicedBy;
