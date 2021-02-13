import React from 'react';
import PropTypes from 'prop-types';
import "./ShowButton.scss"


function ShowButton({ticketsCount,setTicketsCount} : ShowButtonInt) {
    return (
        <button className="tickets__next" onClick={() => setTicketsCount(ticketsCount+5)}><span>ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!</span> </button>
    );
}
ShowButton.propTypes = {
    ticketsCount : PropTypes.number,
    setTicketsCount: PropTypes.func
};
interface ShowButtonInt {
    ticketsCount : number;
    setTicketsCount : Function;
}
export default ShowButton;