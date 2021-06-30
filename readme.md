# TS-Aviation

Retrieves arrival and departure data for UK airports.

This library is currently in **beta**. It only includes a small number of airports at the moment, all of which are in the United Kingdom.

This is due to data limitations, but the aim is to add more airports in future.

### Supported airports

The following airports are supported at this time:

- `EDI` (Edinburgh)
- `MAN` (Manchester)
- `EMA` (East Midlands)
- `ABZ` (Aberdeen)
- `GLA` (Glasgow)
- `SOU` (Southampton)
- `LBA` (Leeds Bradford)
- `STN` (Stansted)

### Example usage

To retrieve data for an airport, use the following example:

```js
getDataForAirport({
  airport: "LBA",
}).then(({ arrivals, departures }) => {
  console.log({ arrivals, departures });
});
```

The following airports require an API key: `EMA` (East Midlands), `MAN` (Manchester), `STN` (Stansted).

To get data for any of these airports, use the following example:

```js
getDataForAirport({
  airport: "MAN",
  apiKeys: {
    MAG: "your_api_key_for_manchester_airport_group_api",
  },
}).then(({ arrivals, departures }) => {
  console.log({ arrivals, departures });
});
```

You should contact the Manchester Airport Group commercial team to enquire about this (https://commercialmagit.co.uk/).

### Output structure / interface

The output from a call will be defined below (as `IFlightAPIMappedResponse`).

```typescript
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
```

Many properties are marked as optional as not all airports provide all data. For example, most airports currently supported don't provide `estimated` or `actual` times, and only a few provide a `deskFrom` and `deskTo` property. I'd recommend experimenting with the library

Since the data is provided by third-parties, it is possible that some fields may stop providing data, such as if the data provider changes how their data is structured. This library maps properties from each supported airport into a consistent structure, but if the data provided by the data providers changes, this library may stop returning data.

Please open an issue if you notice this happening.

Pull requests are welcome! PR's which provide additional support for United Kingdom airports will be prioritised, but all PR's for any airport are very appreciated.
