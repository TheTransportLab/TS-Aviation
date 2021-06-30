"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const format_1 = __importDefault(require("date-fns/format"));
const addHours_1 = __importDefault(require("date-fns/addHours"));
const graphql_request_1 = require("graphql-request");
const fetchData = async ({ apiKey, tenant, from = new Date(), to = addHours_1.default(new Date(), 24), }) => {
    const query = graphql_request_1.gql `
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
    const client = new graphql_request_1.GraphQLClient("https://flights.live.apiservices.maginfrastructure.com/graphql", {
        headers: {
            "x-api-key": apiKey,
        },
    });
    const response = JSON.parse(JSON.stringify(await client.request(query, {
        tenant,
        size: 30,
        from: 0,
        startDate: format_1.default(from, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        endDate: format_1.default(to, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        operationName: null,
    })));
    const arrivalsResponse = response.allArrivals.map((entry) => {
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
    });
    const departuresResponse = response.allDepartures.map((entry) => {
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
    });
    return {
        arrivals: arrivalsResponse,
        departures: departuresResponse,
    };
};
exports.fetchData = fetchData;
//# sourceMappingURL=ManchesterAirportGroup.js.map