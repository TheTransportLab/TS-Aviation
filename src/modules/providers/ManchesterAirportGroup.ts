import fetch from "node-fetch";
import { TMAGTenant } from "@Modules/tenants";
import formatDate from "date-fns/format";
import addHours from "date-fns/addHours";
import { request, gql, GraphQLClient } from "graphql-request";
import { IFlightAPIMappedResponse, IFlightEntryMap } from "@Modules/mapping";

export interface IArgs {
  apiKey: string;
  tenant: TMAGTenant;
  from?: Date;
  to?: Date;
}

interface IAPIResponse {
  allDepartures: AllDeparture[];
  allArrivals: AllArrival[];
}

interface AllArrival {
  id: string;
  flightDirection: string;
  scheduledDepartureDateTime: string;
  scheduledArrivalDateTime: string;
  estimatedArrivalDateTime?: string;
  actualArrivalDateTime?: any;
  arrivalAirport: ArrivalAirport;
  departureAirport: ArrivalAirport;
  flightNumber: string;
  airline: Airline;
  arrivalTerminal: string;
  departureTerminal?: any;
  status: string;
  __typename: string;
}

interface AllDeparture {
  id: string;
  flightDirection: string;
  scheduledDepartureDateTime: string;
  scheduledArrivalDateTime: string;
  estimatedDepartureDateTime?: any;
  actualDepartureDateTime?: any;
  arrivalAirport: ArrivalAirport;
  departureAirport: ArrivalAirport;
  flightNumber: string;
  airline: Airline;
  arrivalTerminal?: any;
  departureTerminal: string;
  status: string;
  __typename: string;
}

interface Airline {
  name: string;
  __typename: string;
}

interface ArrivalAirport {
  name: string;
  cityName: string;
  countryName: string;
  code: string;
  __typename: string;
}

export const fetchData = async ({
  apiKey,
  tenant,
  from = new Date(),
  to = addHours(new Date(), 24),
}: IArgs): Promise<IFlightAPIMappedResponse> => {
  const query = gql`
    query (
      $tenant: String!
      $startDate: AWSDateTime
      $endDate: AWSDateTime
      $size: Int
      $from: Int
    ) {
      allDepartures(
        tenant: $tenant
        startDate: $startDate
        endDate: $endDate
        size: $size
        from: $from
      ) {
        id
        flightDirection
        scheduledDepartureDateTime
        scheduledArrivalDateTime
        estimatedDepartureDateTime
        actualDepartureDateTime
        arrivalAirport {
          name
          cityName
          countryName
          code
          __typename
        }
        departureAirport {
          name
          cityName
          countryName
          code
          __typename
        }
        flightNumber
        airline {
          name
          __typename
        }
        arrivalTerminal
        departureTerminal
        status
        __typename
      }

      allArrivals(
        tenant: $tenant
        startDate: $startDate
        endDate: $endDate
        size: $size
        from: $from
      ) {
        id
        flightDirection
        scheduledDepartureDateTime
        scheduledArrivalDateTime
        estimatedArrivalDateTime
        actualArrivalDateTime
        arrivalAirport {
          name
          cityName
          countryName
          code
          __typename
        }
        departureAirport {
          name
          cityName
          countryName
          code
          __typename
        }
        flightNumber
        airline {
          name
          __typename
        }
        arrivalTerminal
        departureTerminal
        status
        __typename
      }
    }
  `;

  const client = new GraphQLClient(
    "https://flights.live.apiservices.maginfrastructure.com/graphql",
    {
      headers: {
        "x-api-key": apiKey,
      },
    }
  );
  const response: IAPIResponse = JSON.parse(
    JSON.stringify(
      await client.request(query, {
        tenant,
        size: 30,
        from: 0,
        startDate: formatDate(from, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        endDate: formatDate(to, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        operationName: null,
      })
    )
  );

  const arrivalsResponse: IFlightEntryMap[] = response.allArrivals.map(
    (entry) => {
      return {
        airline: entry.airline.name,
        flightNumber: entry.flightNumber,
        times: {
          arrival: {
            scheduled: entry.scheduledArrivalDateTime,
            estimated: entry.estimatedArrivalDateTime,
          },
        },
        arrivalTerminal: entry.arrivalTerminal,
        destination: {
          airportCode: entry.arrivalAirport.code,
          name: entry.arrivalAirport.name,
          city: entry.arrivalAirport.cityName,
          country: entry.arrivalAirport.countryName,
        },
        origin: {
          airportCode: entry.departureAirport.code,
          name: entry.departureAirport.name,
          city: entry.departureAirport.cityName,
          country: entry.departureAirport.countryName,
        },
        flightDirection: "inbound",
      };
    }
  );

  const departuresResponse: IFlightEntryMap[] = response.allDepartures.map(
    (entry) => {
      return {
        airline: entry.airline.name,
        flightNumber: entry.flightNumber,
        times: {
          departure: {
            scheduled: entry.scheduledDepartureDateTime,
            estimated: entry.estimatedDepartureDateTime,
          },
        },
        arrivalTerminal: entry.arrivalTerminal,
        origin: {
          airportCode: entry.departureAirport.code,
          city: entry.departureAirport.cityName,
          country: entry.departureAirport.countryName,
          name: entry.departureAirport.name,
        },
        destination: {
          airportCode: entry.arrivalAirport.code,
          name: entry.arrivalAirport.name,
          city: entry.arrivalAirport.cityName,
          country: entry.arrivalAirport.countryName,
        },
        flightDirection: "outbound",
      };
    }
  );

  return {
    arrivals: arrivalsResponse,
    departures: departuresResponse,
  };
};
