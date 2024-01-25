"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type State = {
  displayNavigation: boolean;
};

type AppContextProps = {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
};

const AppContext = createContext<AppContextProps>(null!);

export function useAppContext() {
  return useContext(AppContext);
}

export default function AppContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState({ displayNavigation: true });
  const contextValue = useMemo(() => ({ state, setState }), [state, setState]);
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
