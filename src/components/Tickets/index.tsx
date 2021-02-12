import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./tickets.scss";
import TicketComponent from "./ticket"
import axios from "../../axios";
import requests from "../../requests";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

function Tickets({ filters, allFilter }: TicketsInt) {
  const [searchId, setSearchId] = useState<string>("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [sortedTickets, setSortedTickets] = useState<Ticket[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState({
    all: true,
    without: false,
    one: false,
    two: false,
    three: false,
  });
  const [sort, setSort] = useState({ lowPrice: true, faster: false });

  const sortTickets = useCallback(
    (ticketsArray: Ticket[]) => {
      const ticketsTemp = [...ticketsArray];
      if (sort.faster) {
        return ticketsTemp.sort((a, b) => {
          return (
            a.segments[0].duration +
            a.segments[1].duration -
            (b.segments[0].duration + b.segments[1].duration)
          );
        });
      }
      if (sort.lowPrice) {
        return ticketsTemp.sort((a, b) => a.price - b.price);
      }
      return ticketsTemp;
    },
    [sort]
  );

  const filterTickets = useCallback(
    (ticketArray: Ticket[]) => {
      return ticketArray.filter((ticket) => {
        if (filter.all) return ticket;
        if (
          filter.without &&
          ticket.segments[0].duration === 0 &&
          ticket.segments[1].duration === 0
        )
          return true;
        if (
          filter.one &&
          ticket.segments[0].duration === 1 &&
          ticket.segments[1].duration === 1
        )
          return true;
        if (
          filter.two &&
          ticket.segments[0].duration === 2 &&
          ticket.segments[1].duration === 2
        )
          return true;
        if (
          filter.three &&
          ticket.segments[0].duration === 3 &&
          ticket.segments[1].duration === 3
        )
          return true;
        return false;
      });
    },
    [filter]
  );
  useEffect(() => {
    async function getSearchId() {
      const result = await axios.get(requests.fetchSearchId);
      return result.data.searchId;
    }

    getSearchId().then((searchIdReturn: string) => {
      setSearchId(searchIdReturn);
    });
  }, []);
  useEffect(() => {
    if (searchId && !isLoaded) {
      const getTickets = async (searchId: string) => {
        const result = await axios.get(requests.fetchTickets, {
          params: {
            searchId: searchId,
          },
        }).then( (data) => {
            if(data.status === 500) getTickets(searchId);
            return data;
            }

        ) ;

        return result.data;
      };

      const getTicketsBySearchId = (searchIdReturn: string) => {
        getTickets(searchIdReturn)
          .then((result) => {
            if (result.stop) setIsLoaded(true);
            console.log(result);
            setTickets([...tickets, ...result.tickets]);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getTicketsBySearchId(searchId);
    }
  }, [searchId, tickets, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
        setSortedTickets( sortTickets(filterTickets(tickets)).slice(0,5));
    }
  }, [tickets, filters, sort,isLoaded]);

  return ( <TicketComponent sorted = {sortedTickets} /> );
}

Tickets.propTypes = {
  filters: PropTypes.array,
  allFilter: PropTypes.bool,
  sortTickets: PropTypes.number,
};

interface filtersKey {
  id: number;
  name: string;
  checked: boolean;
}

interface TicketsInt {
  filters: Array<filtersKey>;
  allFilter: boolean;
  sortTickets: number;
}

interface Ticket {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [
    {
      // Код города (iata)
      origin: string;
      // Код города (iata)
      destination: string;
      // Дата и время вылета туда
      date: string;
      // Массив кодов (iata) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    },
    {
      // Код города (iata)
      origin: string;
      // Код города (iata)
      destination: string;
      // Дата и время вылета обратно
      date: string;
      // Массив кодов (iata) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    }
  ];
}

export default Tickets;
