"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const fetchData = async ({ tenant, }) => {
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
    const result = await (await node_fetch_1.default(endpointBaseUrl)).json();
    const arrivalsResult = result.arrivals.map((entry) => {
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
    const departuresResult = result.departures.map((entry) => {
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
exports.fetchData = fetchData;
//# sourceMappingURL=Umbraco.js.map