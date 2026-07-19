import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { NoraProvider } from "./context/NoraContext";
import { AgentProvider } from "./context/AgentContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { SidebarProvider } from "./context/SidebarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      <AgentProvider>

        <EmployeeProvider>

          <NoraProvider>

            <SidebarProvider>
              <App />
            </SidebarProvider>

          </NoraProvider>

        </EmployeeProvider>

      </AgentProvider>

    </BrowserRouter>
  </React.StrictMode>
);