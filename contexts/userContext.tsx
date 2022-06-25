import { createContext, Dispatch, Reducer, useReducer } from "react";

type UserStateType = {
  spotify: any;
  wagmi: any;
};

type UserContextType = {
  state: UserStateType;
  dispatch: Dispatch<UserActions>;
};

const initialState: UserStateType = {
  spotify: "",
  wagmi: ""
};

export enum UserContextActionTypes {
  SET_SPOTIFY_USER = "SET_SPOTIFY_USER",
  CLEAR_SPOTIFY_USER = "CLEAR_SPOTIFY_USER",
  SET_WAGMI_USER = "SET_WAGMI_USER",
  CLEAR_WAGMI_USER = "CLEAR_WAGMI_USER"
}

type UserActionCreators = {
  [UserContextActionTypes.SET_SPOTIFY_USER]: {
    spotify: any;
  };
  [UserContextActionTypes.CLEAR_SPOTIFY_USER]: undefined;
  [UserContextActionTypes.SET_WAGMI_USER]: {
    wagmi: any;
  };
  [UserContextActionTypes.CLEAR_WAGMI_USER]: undefined;
};

type UserActions = ReducerActions<UserActionCreators>;

const reducer: Reducer<UserStateType, UserActions> = (
  state: UserStateType,
  action: UserActions
) => {
  switch (action.type) {
    case UserContextActionTypes.SET_SPOTIFY_USER: {
      return {
        ...state,
        spotify: action.payload.spotify
      };
    }
    case UserContextActionTypes.CLEAR_SPOTIFY_USER: {
      return {
        ...initialState
      };
    }
    case UserContextActionTypes.SET_WAGMI_USER: {
      return {
        ...state,
        wagmi: action.payload.wagmi
      };
    }
    case UserContextActionTypes.CLEAR_WAGMI_USER: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const Provider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
