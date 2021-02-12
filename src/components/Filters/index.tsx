import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./filters.scss";

function Filter({ filters, allFilter, setAllFilter, setFilters }: propTypes) {
  const checkAllFilter = () => {
    return !filters.some((filter) => !filter.checked);
  };
  const onAllFilterChange = () => {
    filters.forEach((filter) => (filter.checked = !allFilter));
    setAllFilter(!allFilter);
  };
  useEffect(() => {
    setAllFilter(checkAllFilter);
  }, []);
  const onFilterChange = (index: number) => {
    let filtersCopy: Array<filtersKey> = [];
    filtersCopy = filtersCopy.concat(filters);
    filtersCopy.map((filter) => {
      filter.id === index && (filter.checked = !filter.checked);
    });
    setFilters(filtersCopy);
    setAllFilter(checkAllFilter());
  };
  return (
    <div className="filter">
      <div className="filter__header">КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <ul>
        <li>
          <input
            type="checkbox"
            id="filter__all"
            checked={allFilter}
            onChange={onAllFilterChange}
          />
          <label htmlFor="filter__all" />
          <p>Все</p>
        </li>
        {filters.map((filter) => {
          return (
            <li key={filter.id}>
              <input
                type="checkbox"
                id={`filter_${filter.id}`}
                checked={filter.checked}
                onChange={() => onFilterChange(filter.id)}
              />
              <label htmlFor={`filter_${filter.id}`} />
              <p>{filter.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


interface filtersKey {
    id: number;
    name: string;
    checked: boolean;
}
interface propTypes {
  filters: Array<filtersKey>;
  allFilter: boolean;
  setAllFilter: Function;
  setFilters: Function;
}

Filter.propTypes = {
  filters: PropTypes.array,
  allFilter: PropTypes.bool,
  setAllFilter: PropTypes.func,
  setFilters: PropTypes.func,
};


export default Filter;