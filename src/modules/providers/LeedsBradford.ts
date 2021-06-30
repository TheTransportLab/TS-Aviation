import fetch from "node-fetch";
import { IFlightAPIMappedResponse, IFlightEntryMap } from "@Modules/mapping";

interface IArrivalsOrDepartures {
  id: string;
  flight_ident: string;
  scheduled_time: string;
  airport_name: string;
  airport_iata: string;
  airline_name: string;
  airline: string;
  airline_iata: string;
  message?: string;
  status?: string;
  gate?: any;
  actual_time?: any;
}

export const fetchData = async (): Promise<IFlightAPIMappedResponse> => {
  const departures = await (
    await fetch(`https://lba-flights.production.parallax.dev/departures`)
  ).json();

  const arrivals: IArrivalsOrDepartures[] = await (
    await fetch(`https://lba-flights.production.parallax.dev/arrivals`)
  ).json();

  const arrivalsResult: IFlightEntryMap[] = arrivals.map((entry) => {
    return {
      airline: entry.airline,
      flightNumber: entry.flight_ident,
      times: {
        arrival: {
          actual: entry.actual_time,
          scheduled: entry.scheduled_time,
        },
      },
      arrivalTerminal: entry.gate,
      destination: {
        airportCode: "LBA",
        city: "Leeds",
        country: "United Kingdom",
        name: "Leeds Bradford",
      },
      origin: {
        airportCode: entry.airport_iata,
        name: entry.airport_name,
      },
      flightDirection: "inbound",
    };
  });

  const departuresResult: IFlightEntryMap[] = departures.map((entry) => {
    return {
      airline: entry.airline,
      flightNumber: entry.flight_ident,
      times: {
        arrival: {
          actual: entry.actual_time,
          scheduled: entry.scheduled_time,
        },
      },
      arrivalTerminal: entry.gate,
      origin: {
        airportCode: "LBA",
        city: "Leeds",
        country: "United Kingdom",
        name: "Leeds Bradford",
      },
      destination: {
        airportCode: entry.airport_iata,
        name: entry.airport_name,
      },
      flightDirection: "inbound",
    };
  });

  const result = {
    arrivals: arrivalsResult,
    departures: departuresResult,
  };

  return result;
};
