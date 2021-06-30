import fetch from "node-fetch";
import { IFlightAPIMappedResponse, IFlightEntryMap } from "@Modules/mapping";

interface IArrivalsOrDepartures {
  FlightNo: string;
  Date: string;
  Time: string;
  ArrDep: string;
  PortOfCallA: string;
  Status: string;
  OtherInfo: string;
  Additional: string;
  Airline: string;
  Image: string;
  ArrHall: string;
  dateTime: string;
  airlineCode: string;
  CodeShare: number;
  ParentFlight: string;
  Gate: string;
  Active: number;
}

export const fetchData = async (): Promise<IFlightAPIMappedResponse> => {
  const departures: IArrivalsOrDepartures[] = await (
    await fetch(
      `https://kabrudlev2.edinburghairport.com/api/flights/departures`
    )
  ).json();

  const arrivals: IArrivalsOrDepartures[] = await (
    await fetch(`https://kabrudlev2.edinburghairport.com/api/flights/arrivals`)
  ).json();

  const departuresResult: IFlightEntryMap[] = departures.map((entry) => {
    return {
      airline: entry.Airline,
      flightNumber: entry.FlightNo,
      times: {
        departure: {
          scheduled: entry.dateTime,
        },
      },
      flightDirection: entry.ArrDep === "A" ? "inbound" : "outbound",
      // arrivalTerminal: entry.Gate,
      // departureTerminal
      destination: {
        name: entry.PortOfCallA,
      },
      origin: {
        airportCode: "EDI",
        name: "Edinburgh",
        country: "United Kingdom",
        city: "Edinburgh",
      },
    };
  });

  const arrivalsResult: IFlightEntryMap[] = arrivals.map((entry) => {
    return {
      airline: entry.Airline,
      flightNumber: entry.FlightNo,
      times: {
        departure: {
          scheduled: entry.dateTime,
        },
      },
      flightDirection: entry.ArrDep === "A" ? "inbound" : "outbound",
      // arrivalTerminal: entry.Gate,
      // departureTerminal
      origin: {
        name: entry.PortOfCallA,
      },
      destination: {
        airportCode: "EDI",
        name: "Edinburgh",
        country: "United Kingdom",
        city: "Edinburgh",
      },
    };
  });

  const result = {
    arrivals: arrivalsResult,
    departures: departuresResult,
  };

  return result;
};
