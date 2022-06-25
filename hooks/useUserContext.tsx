import { UserContext, UserContextActionTypes } from "contexts/userContext";
import { useContext } from "react";

const useUserContext = () => {
  const userContext = useContext(UserContext);
  const { state, dispatch } = userContext;
  const setSpotifyUser = (data: any) => {
    dispatch({
      type: UserContextActionTypes.SET_SPOTIFY_USER,
      payload: { spotify: data }
    });
  };
  const clearSpotifyUser = () => {
    dispatch({ type: UserContextActionTypes.CLEAR_SPOTIFY_USER });
  };
  return {
    ...state,
    clearSpotifyUser,
    setSpotifyUser
  };
};

export default useUserContext;
