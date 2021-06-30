export type TEndpointType = "MAG" | "Umbraco" | "Edinburgh" | "LeedsBradford";

export type TAirport =
  | "EDI"
  | "MAN"
  | "EMA"
  | "ABZ"
  | "GLA"
  | "SOU"
  | "LBA"
  | "STN";

export interface IMapAirportToRequestResponse {
  endpointType: TEndpointType;
}

export const mapAirportToRequest = (
  airport: TAirport
): IMapAirportToRequestResponse => {
  switch (airport) {
    // Manchester Airport Group
    case "MAN":
    case "EMA":
    case "STN":
      return {
        endpointType: "MAG",
      };

    // Umbraco
    case "ABZ":
    case "GLA":
    case "SOU":
      return {
        endpointType: "Umbraco",
      };

    // Independent
    case "EDI":
      return {
        endpointType: "Edinburgh",
      };
    case "LBA":
      return {
        endpointType: "LeedsBradford",
      };
  }
};
