import "module-alias/register";
import {
  MAGFetchData,
  EdinburghFetchData,
  LeedsBradfordFetchData,
  UmbracoFetchData,
} from "@Modules/providers";
import { mapAirportToRequest, TAirport } from "./airportMapping";
import { TMAGTenant, TUmbracoTenant } from "@Modules/tenants";

export interface IGetDataForAirportArgs {
  airport: TAirport;
  apiKeys?: {
    MAG?: string;
  };
}

export const getDataForAirport = async ({
  airport,
  apiKeys,
}: IGetDataForAirportArgs) => {
  const MAGApiKey = apiKeys?.MAG;
  const { endpointType } = mapAirportToRequest(airport);

  switch (endpointType) {
    case "MAG":
      if (!MAGApiKey) {
        throw new Error(
          `You must specify "apiKeys.MAG" for MAN, EMA and STN airports`
        );
      }
      return await MAGFetchData({
        apiKey: MAGApiKey,
        tenant: airport as TMAGTenant,
      });

    case "Umbraco":
      return await UmbracoFetchData({
        tenant: airport as TUmbracoTenant,
      });

    case "LeedsBradford":
      return await LeedsBradfordFetchData();

    case "Edinburgh":
      return await EdinburghFetchData();
  }
};
