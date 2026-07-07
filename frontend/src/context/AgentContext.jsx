import { createContext, useContext, useState } from "react";

const AgentContext = createContext();

export function AgentProvider({ children }) {

  const [agent, setAgent] = useState({
    id: "nora",
    title: "Nora AI"
  });

  return (

    <AgentContext.Provider
      value={{
        agent,
        setAgent
      }}
    >

      {children}

    </AgentContext.Provider>

  );

}

// eslint-disable-next-line react-refresh/only-export-components
export function useAgent() {

  return useContext(AgentContext);

}