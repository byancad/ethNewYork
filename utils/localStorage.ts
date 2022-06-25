export const setAccessToken = async (access_token: string) => {
  await localStorage.setItem("spotify_access_token", access_token);
};

export const setRefreshToken = async (refresh_token: string) => {
  await localStorage.setItem("refresh_token", refresh_token);
};

export const getAccessToken = async () => {
  return await localStorage.getItem("spotify_access_token");
};

export const getRefreshToken = async () => {
  return await localStorage.getItem("refresh_token");
};
