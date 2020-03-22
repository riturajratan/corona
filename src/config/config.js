export const API = {
  total: "https://corona.lmao.ninja/all",
  confirmed: "https://covid19.mathdro.id/api/confirmed",
  recovered: "https://covid19.mathdro.id/api/recovered",
  deaths: "https://covid19.mathdro.id/api/deaths",
  dailySummary: "https://covid19.mathdro.id/api/daily",
  dailyTimeSeries: {
    pattern: "https://covid19.mathdro.id/api/daily/[dateString]",
    example: "https://covid19.mathdro.id/api/daily/2-14-2020"
  },
  image: "https://covid19.mathdro.id/api/og",
  source: "https://github.com/mathdroid/covid19",
  countries: "https://corona.lmao.ninja/countries",
  countryDetail: {
    pattern: "https://covid19.mathdro.id/api/countries/[country]",
    example: "https://covid19.mathdro.id/api/countries/USA"
  },
  historical: "https://corona.lmao.ninja/historical",
  map: "https://corona.lmao.ninja/jhucsse",
  lastUpdate: "2020-03-20T14:43:04.000Z"
};
