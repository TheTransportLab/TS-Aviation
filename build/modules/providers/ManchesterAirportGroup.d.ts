import { TMAGTenant } from "@Modules/tenants";
import { IFlightAPIMappedResponse } from "@Modules/mapping";
export interface IArgs {
    apiKey: string;
    tenant: TMAGTenant;
    from?: Date;
    to?: Date;
}
export declare const fetchData: ({ apiKey, tenant, from, to, }: IArgs) => Promise<IFlightAPIMappedResponse>;
