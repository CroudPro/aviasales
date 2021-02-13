import React from 'react';
import PropTypes from 'prop-types';



function Spacer({ ticketsCount, ticketsLength} : spacerInt) {
    let spacers = [];
    for(let i = 0; i < (ticketsCount < ticketsLength ? ticketsCount : ticketsLength); i++) spacers.push(<div className="tickets__blank"/>);
  return (

      <div className="tickets">
          {spacers}
      </div>
  );
}
Spacer.propTypes = {
    ticketsCount: PropTypes.number,
    ticketsLength: PropTypes.number
};
interface spacerInt {
    ticketsCount : number;
    ticketsLength : number;
}
export default Spacer;