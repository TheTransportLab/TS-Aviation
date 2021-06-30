"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAirportToRequest = void 0;
const mapAirportToRequest = (airport) => {
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
exports.mapAirportToRequest = mapAirportToRequest;
//# sourceMappingURL=airportMapping.js.map