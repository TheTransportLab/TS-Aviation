"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const fetchData = async () => {
    const departures = await (await node_fetch_1.default(`https://lba-flights.production.parallax.dev/departures`)).json();
    const arrivals = await (await node_fetch_1.default(`https://lba-flights.production.parallax.dev/arrivals`)).json();
    const arrivalsResult = arrivals.map((entry) => {
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
    const departuresResult = departures.map((entry) => {
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
exports.fetchData = fetchData;
//# sourceMappingURL=LeedsBradford.js.map