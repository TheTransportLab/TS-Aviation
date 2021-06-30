"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataForAirport = void 0;
require("module-alias/register");
const providers_1 = require("@Modules/providers");
const airportMapping_1 = require("./airportMapping");
const getDataForAirport = async ({ airport, apiKeys, }) => {
    const MAGApiKey = apiKeys === null || apiKeys === void 0 ? void 0 : apiKeys.MAG;
    const { endpointType } = airportMapping_1.mapAirportToRequest(airport);
    switch (endpointType) {
        case "MAG":
            if (!MAGApiKey) {
                throw new Error(`You must specify "apiKeys.MAG" for MAN, EMA and STN airports`);
            }
            return await providers_1.MAGFetchData({
                apiKey: MAGApiKey,
                tenant: airport,
            });
        case "Umbraco":
            return await providers_1.UmbracoFetchData({
                tenant: airport,
            });
        case "LeedsBradford":
            return await providers_1.LeedsBradfordFetchData();
        case "Edinburgh":
            return await providers_1.EdinburghFetchData();
    }
};
exports.getDataForAirport = getDataForAirport;
//# sourceMappingURL=index.js.map