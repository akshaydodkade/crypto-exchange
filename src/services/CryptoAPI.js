import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const cryptoHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': 'c32823898fmshb13025325b1f43ap1c0a31jsnda3efa886ac3'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com/stats';

const createRequest = (url) => ({ url: url, headers: cryptoHeaders });

export const CryptoAPI = createApi({
  reducerPath: 'CryptoAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest('/exchanges')
    })
  })

});