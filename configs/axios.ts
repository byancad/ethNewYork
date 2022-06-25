import axios, { AxiosInstance } from "axios";

let server: AxiosInstance;
let spotify: AxiosInstance;

export const spotifyRequest = () => {
  if (!spotify) {
    spotify = axios.create({ baseURL: process.env.SPOTIFY_BASE_URL });
  }
  return spotify;
};

export const serverRequest = () => {
  if (!server) {
    server = axios.create({ baseURL: process.env.API_BASE_URL });
  }
  return server;
};
