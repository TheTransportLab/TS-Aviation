"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const fetchData = async () => {
    const departures = await (await node_fetch_1.default(`https://kabrudlev2.edinburghairport.com/api/flights/departures`)).json();
    const arrivals = await (await node_fetch_1.default(`https://kabrudlev2.edinburghairport.com/api/flights/arrivals`)).json();
    const departuresResult = departures.map((entry) => {
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
    const arrivalsResult = arrivals.map((entry) => {
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
exports.fetchData = fetchData;
//# sourceMappingURL=Edinburgh.js.map