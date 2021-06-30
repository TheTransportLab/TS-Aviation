interface ITimes {
    scheduled?: string;
    estimated?: string;
    actual?: string;
}
interface IDestination {
    name?: string;
    airportCode?: string;
    city?: string;
    country?: string;
}
export interface IFlightEntryMap {
    flightDirection?: "inbound" | "outbound";
    flightNumber: string;
    times: {
        departure?: ITimes;
        arrival?: ITimes;
    };
    arrivalTerminal?: string;
    departureTerminal?: string;
    origin?: IDestination;
    destination?: IDestination;
    airline: string;
    deskFrom?: string;
    deskTo?: string;
}
export interface IFlightAPIMappedResponse {
    arrivals: IFlightEntryMap[];
    departures: IFlightEntryMap[];
}
export {};
