import { IFlightAPIMappedResponse } from "@Modules/mapping";
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
export declare const fetchData: ({ tenant, }: IArgs) => Promise<IFlightAPIMappedResponse>;
export {};
