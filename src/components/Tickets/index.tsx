import React, {useState, useEffect, useCallback} from "react";
import PropTypes from "prop-types";
import "./tickets.scss";
import TicketComponent from "./ticket";
import Spacer from "./spacer"
import axios from "../../axios";

import requests from "../../requests";
import axiosRetry from "axios-retry";

axiosRetry(axios, {retries: 3});

function Tickets({filters, allFilter, sort, ticketsCount, isLoaded, setIsLoaded,setTicketsCount}: TicketsInt) {

    const [searchId, setSearchId] = useState<string>("");
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [sortedTickets, setSortedTickets] = useState<Ticket[]>([]);


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
            if (sort.optimum) {
                return ticketsTemp.sort((a, b) => {
                    return (
                        a.segments[0].duration +
                        a.segments[1].duration + a.price -
                        (b.segments[0].duration + b.segments[1].duration + b.price)
                    );
                });
            }
            return ticketsTemp;
        },
        [sort]
    );
    useEffect(() => {
        setTicketsCount(5);
    }, [filters, allFilter,sort])
    const filterTickets = useCallback(
        (ticketArray: Ticket[]) => {

            return ticketArray.filter((ticket) => {
                if (allFilter) return 1;
                if (
                    filters[0]
                        .checked &&
                    ticket.segments[0].stops.length === 0 &&
                    ticket.segments[1].stops.length === 0
                )
                    return 1;
                if (
                    filters[1]
                        .checked &&
                    ticket.segments[0].stops.length === 1 &&
                    ticket.segments[1].stops.length === 1
                )
                    return 1;
                if (
                    filters[2]
                        .checked &&
                    ticket.segments[0].stops.length === 2 &&
                    ticket.segments[1].stops.length === 2
                )
                    return 1;
                if (
                    filters[3]
                        .checked &&
                    ticket.segments[0].stops.length === 3 &&
                    ticket.segments[1].stops.length === 3
                )
                    return 1;
                return false;
            });
        },
        [filters, allFilter]
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
                const result = await axios
                    .get(requests.fetchTickets, {
                        params: {
                            searchId: searchId,
                        },
                    })
                    .then((data) => {
                        if (data.status === 500) getTickets(searchId);
                        return data;
                    });

                return result.data;
            };

            const getTicketsBySearchId = (searchIdReturn: string) => {
                getTickets(searchIdReturn)
                    .then((result) => {
                        if (result.stop) setIsLoaded(true);
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
            console.log(filters)
            console.log(filterTickets(tickets).slice(0, 5));
            setSortedTickets(sortTickets(filterTickets(tickets)).slice(0, (ticketsCount < tickets.length ? ticketsCount : tickets.length)));
        }
    }, [tickets, filters, sort, isLoaded, allFilter,ticketsCount]);

    return (isLoaded ? <TicketComponent sorted={sortedTickets}/> :
        <Spacer ticketsCount={ticketsCount} ticketsLength={tickets.length}/>);
}

Tickets.propTypes = {
    filters: PropTypes.array,
    allFilter: PropTypes.bool,
    sortTickets: PropTypes.object,
    isLoaded: PropTypes.bool,
    setIsLoaded: PropTypes.func,
    setTicketsCount: PropTypes.func
};

interface filtersKey {
    id: number;
    name: string;
    checked: boolean;
}

interface sorter {
    lowPrice: boolean;
    faster: boolean;
    optimum: boolean;
}

interface TicketsInt {
    filters: Array<filtersKey>;
    allFilter: boolean;
    sort: sorter;
    ticketsCount: number;
    isLoaded: boolean;
    setIsLoaded: Function;
    setTicketsCount: Function;
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
