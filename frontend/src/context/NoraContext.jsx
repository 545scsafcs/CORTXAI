import { createContext, useContext, useState } from "react";

const NoraContext = createContext();

export function NoraProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <NoraContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </NoraContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNora() {
  return useContext(NoraContext);
}