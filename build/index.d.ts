import "module-alias/register";
import { TAirport } from "./airportMapping";
export interface IGetDataForAirportArgs {
    airport: TAirport;
    apiKeys?: {
        MAG?: string;
    };
}
export declare const getDataForAirport: ({ airport, apiKeys, }: IGetDataForAirportArgs) => Promise<import("./modules/mapping").IFlightAPIMappedResponse>;
