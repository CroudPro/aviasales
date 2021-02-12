import React from "react";

function Ticket({ sorted }: TicketsInterface) {
  const numberWithCommas = (x: number) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const formatDate = (date: string, add: number) => {
    let temp = new Date(date);
    temp = new Date(temp.getTime() + add);
    return temp;
  };
    const declOfNum = (n : number, text_forms : string[]) => {
        n = Math.abs(n) % 100; let n1 = n % 10;
        if (n > 10 && n < 20) { return text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }
        if (n1 == 1) { return text_forms[0]; }
        return text_forms[2];
    };
  return (
    <div className="tickets">
      {sorted.map((ticket,index) => {
        return (
          <div className="tickets__item" key={index}>
            <div className="tickets__header">
              <div className="tickets__price">
                {numberWithCommas(ticket.price)} Р
              </div>
              <div className="tickets__spacer" />
              <img
                src={`http://pics.avs.io/99/36/${ticket.carrier}.png`}
                alt=""
              />
            </div>
            <div className="tickets__content">
              {ticket.segments.map((segment,index) => {
                return (
                  <div className="tickets__segment" key={index}>
                    <div className="tickets__block">
                      <div className="tickets__segment-header">
                        {segment.origin}-{segment.destination}
                      </div>
                      <div className="tickets__segment-content">
                        {("0" + new Date(segment.date).getHours()).slice(-2) +
                          `:` +
                            ("0" + new Date(segment.date).getMinutes()).slice(-2)}{" "}
                        -{" "}
                        {("0" + formatDate(
                          segment.date,
                          segment.duration * 60 * 100
                        ).getHours()).slice(-2) +
                          `:` +
                        ("0" + formatDate(
                            segment.date,
                            segment.duration * 60 * 100
                          ).getMinutes()).slice(-2)}
                      </div>
                    </div>
                    <div className="tickets__block">
                      <div className="tickets__segment-header">В ПУТИ</div>
                      <div className="tickets__segment-content">
                        {("0" + new Date(segment.duration * 60 * 100).getHours()).slice(-2) +
                          `:` +
                        ("0" + new Date(segment.duration * 60 * 100).getMinutes()).slice(-2)}
                      </div>
                    </div>
                    <div className="tickets__block">
                      <div className="tickets__segment-header">{segment.stops.length + " " + declOfNum(segment.stops.length,["ПЕРЕСАДКА","ПЕРЕСАДКИ","ПЕРЕСАДОК"])}</div>
                      <div className="tickets__segment-content">{
                          segment.stops.map((stop) => stop + " ")
                      }</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface TicketsInterface {
  sorted: Array<TicketInterface>;
}

interface TicketInterface {
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

export default Ticket;
