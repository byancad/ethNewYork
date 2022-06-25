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
  const setWagmiUser = (data: any) => {
    dispatch({
      type: UserContextActionTypes.SET_WAGMI_USER,
      payload: { wagmi: data }
    });
  };
  const clearWagmiUser = () => {
    dispatch({ type: UserContextActionTypes.CLEAR_WAGMI_USER });
  };
  return {
    ...state,
    clearSpotifyUser,
    setSpotifyUser,
    setWagmiUser,
    clearWagmiUser
  };
};

export default useUserContext;
