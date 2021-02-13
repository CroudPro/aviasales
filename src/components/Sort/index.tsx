import React, { useCallback } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Sort.scss";

SortButtons.propTypes = {
  sort: PropTypes.object,
  setSort: PropTypes.func,
};

function SortButtons({sort,setSort} : sorterInt) {


  const setCustomSort = useCallback(
    (selected: string) => {
      let tempSort = Object.assign({},sort);
      Object.keys(tempSort).forEach((key) =>
        key === selected ? (tempSort[key as keyof sorter] = true) : (tempSort[key as keyof sorter] = false)
      );
      setSort(tempSort);
    },
    [sort]
  );

  return (
    <div className="app__sort">
      <button
        className={classNames({ "app__sort-selected": sort.lowPrice })}
        onClick={() => setCustomSort("lowPrice")}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={classNames({ "app__sort-selected": sort.faster })}
        onClick={() => setCustomSort("faster")}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={classNames({ "app__sort-selected": sort.optimum })}
        onClick={() => setCustomSort("optimum")}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
}
interface sorterInt {
    sort : sorter;
    setSort : Function;
}
interface sorter {
  lowPrice: boolean;
  faster: boolean;
  optimum: boolean;
}

export default SortButtons;
