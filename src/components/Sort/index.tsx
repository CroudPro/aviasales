import React from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';
import "./Sort.scss"
SortButtons.propTypes = {
    sort: PropTypes.number,
    setSort: PropTypes.func
};
function SortButtons({sort,setSort} : SortButtons) {
    return (
        <div className="app__sort">
            <button className={classNames({'app__sort-selected' : sort === 0})} onClick={() => setSort(0)}  >САМЫЙ ДЕШЕВЫЙ</button>
            <button className={classNames({'app__sort-selected' : sort === 1})} onClick={() => setSort(1)}>САМЫЙ БЫСТРЫЙ</button>
            <button className={classNames({'app__sort-selected' : sort === 2})} onClick={() => setSort(2)}>ОПТИМАЛЬНЫЙ</button>
        </div>
    );
}
interface SortButtons {
    sort:number,
    setSort:Function
}
export default SortButtons;