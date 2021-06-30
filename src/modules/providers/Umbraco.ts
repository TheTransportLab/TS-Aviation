import fetch from "node-fetch";
import { IFlightAPIMappedResponse, IFlightEntryMap } from "@Modules/mapping";
import { TUmbracoTenant } from "@Modules/tenants";

export interface IArrivalsOrDepartures {
  arrivals: Arrival[];
  departures: Departure[];
  lastUpdate: string;
}

interface Departure {
  principleFlightId: number;
  originalFlightNumber: string;
  flightNumber: string;
  scheduledDateTime: string;
  estimatedDateTime?: any;
  aggregatedDateTime: string;
  location: string;
  locationCode: string;
  arriving: boolean;
  checkInDeskFrom: string;
  checkInDeskTo: string;
  codeShares: any[];
  statusMessage: StatusMessage;
  future: boolean;
  subscribable: boolean;
  airlineCode: string;
  airlineName: string;
  airlineLogo: string;
  airlineAffiliateUrl?: string;
  flightDetailsPageUrl: string;
}

interface Arrival {
  principleFlightId: number;
  originalFlightNumber: string;
  flightNumber: string;
  scheduledDateTime: string;
  estimatedDateTime?: any;
  aggregatedDateTime: string;
  location: string;
  locationCode: string;
  arriving: boolean;
  checkInDeskFrom: string;
  checkInDeskTo: string;
  codeShares: any[];
  statusMessage: StatusMessage;
  future: boolean;
  subscribable: boolean;
  airlineCode: string;
  airlineName: string;
  airlineLogo: string;
  airlineAffiliateUrl?: any;
  flightDetailsPageUrl: string;
}

interface StatusMessage {
  mainMessage: string;
  secondaryMessage: string;
  colour: number;
  colourClass: string;
}

export interface IArgs {
  tenant: TUmbracoTenant;
}

export const fetchData = async ({
  tenant,
}: IArgs): Promise<IFlightAPIMappedResponse> => {
  const endpointBaseUrl = (() => {
    switch (tenant) {
      case "ABZ":
        return "https://www.aberdeenairport.com/Umbraco/api/FlightsApi/RetrieveFlights";
      case "GLA":
        return "https://www.glasgowairport.com/Umbraco/api/FlightsApi/RetrieveFlights";
      case "SOU":
        return "https://www.southamptonairport.com/Umbraco/api/FlightsApi/RetrieveFlights";
    }
  })();

  const result: IArrivalsOrDepartures = await (
    await fetch(endpointBaseUrl)
  ).json();

  const arrivalsResult: IFlightEntryMap[] = result.arrivals.map((entry) => {
    return {
      flightNumber: entry.flightNumber,
      times: {
        arrival: {
          scheduled: entry.scheduledDateTime,
          estimated: entry.estimatedDateTime,
        },
      },
      airline: entry.airlineName,
      origin: {
        airportCode: entry.locationCode,
        name: entry.location,
      },
      destination: {
        airportCode: tenant,
      },
      flightDirection: "inbound",
    };
  });

  const departuresResult: IFlightEntryMap[] = result.departures.map((entry) => {
    return {
      flightNumber: entry.flightNumber,
      times: {
        arrival: {
          scheduled: entry.scheduledDateTime,
          estimated: entry.estimatedDateTime,
        },
      },
      airline: entry.airlineName,
      destination: {
        airportCode: entry.locationCode,
        name: entry.location,
      },
      origin: {
        airportCode: tenant,
      },
      flightDirection: "inbound",
      deskFrom: entry.checkInDeskFrom,
      deskTo: entry.checkInDeskTo,
    };
  });

  return {
    arrivals: arrivalsResult,
    departures: departuresResult,
  };
};
