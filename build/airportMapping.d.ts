export declare type TEndpointType = "MAG" | "Umbraco" | "Edinburgh" | "LeedsBradford";
export declare type TAirport = "EDI" | "MAN" | "EMA" | "ABZ" | "GLA" | "SOU" | "LBA" | "STN";
export interface IMapAirportToRequestResponse {
    endpointType: TEndpointType;
}
export declare const mapAirportToRequest: (airport: TAirport) => IMapAirportToRequestResponse;
