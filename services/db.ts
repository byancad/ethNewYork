import { artists, listeners } from "./mocks";

export const getListenerRate = async (address: string) => {
  return listeners[`${address}`];
};

export const getArtistWallet = async (artistId: string) => {
  return artists[`${artistId}`];
};

export const setListenerRate = async (address: string, rate: number) => {
  listeners[`${address}`] = rate;
};

export const setArtistWallet = async (artistId: string, address: string) => {
  artists[`${artistId}`] = address;
};
