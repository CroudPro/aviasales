import "./App.scss";
import logo from "./assets/logo.svg";
import React, { useState } from "react";
import Filter from "./components/Filters/index";
import SortButtons from "./components/Sort";
import Tickets from "./components/Tickets"
import ShowButton from "./components/ShowButton"


function App() {
    const [ticketsCount, setTicketsCount] = useState(5);
  const [filters, setFilters] = useState([
    { id: 1, name: "Без пересадок", checked: true },
    { id: 2, name: "1 пересадка", checked: true },
    { id: 3, name: "2 пересадки", checked: true },
    { id: 4, name: "3 пересадки", checked: true },
  ]);
  const [allFilter, setAllFilter] = useState(true);
  const [sortTickets, setSort] = useState<sorter>({
      lowPrice:true,
      faster:false,
      optimum:false
  });
    const [isLoaded, setIsLoaded] = useState(false);

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
          <Tickets filters={filters} allFilter={allFilter} sort={sortTickets} ticketsCount={ticketsCount} setTicketsCount={setTicketsCount} isLoaded={isLoaded} setIsLoaded={setIsLoaded}/>
            { isLoaded && <ShowButton ticketsCount={ticketsCount} setTicketsCount={setTicketsCount}/> }
        </div>
      </div>
    </div>
  );
}
interface sorter {
    lowPrice: boolean;
    faster: boolean;
    optimum: boolean;
}
export default App;
