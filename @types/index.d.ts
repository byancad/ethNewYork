type ReducerActions<T> =
  | ActionMap<T>[keyof ActionMap<T>]
  | PayloadActionMap<T>[keyof PayloadActionMap<T>];

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : never;
};

type PayloadActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? never
    : {
        type: Key;
        payload: M[Key];
      };
};

type WrapperProps = {
  children: JSX.Element | JSX.Element[];
};
