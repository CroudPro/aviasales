import "./App.scss";
import logo from "./assets/logo.svg";
import React, { useState } from "react";
import Filter from "./components/Filters/index.tsx";
import SortButtons from "./components/Sort";
import Tickets from "./components/Tickets"



function App() {
  const [filters, setFilters] = useState([
    { id: 1, name: "Без пересадок", checked: true },
    { id: 2, name: "1 пересадка", checked: true },
    { id: 3, name: "2 пересадка", checked: true },
    { id: 4, name: "3 пересадка", checked: true },
  ]);
  const [allFilter, setAllFilter] = useState(true);
  const [sortTickets, setSort] = useState(0);
  return (
    <div className="wrapper">
      <img src={logo} alt="Logo" />

      <div className="app">
        <div className="app__left">
          <Filter
            filters={filters}
            allFilter={allFilter}
            setAllFilter={setAllFilter}
            setFilters={setFilters}
          />
        </div>
        <div className="app__right">
          <SortButtons sort={sortTickets} setSort={setSort} />
          <Tickets filters={filters} allFilter={allFilter} sortTickets={sortTickets}/>
        </div>
      </div>
    </div>
  );
}

export default App;
