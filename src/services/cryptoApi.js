import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '32823898fmshb13025325b1f43ap1c0a31jsnda3efa886ac3'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url: url, headers: cryptoHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`)
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history/${timePeriod}`)
    }),
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`)
    }),
  })
});
export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery } = cryptoApi;