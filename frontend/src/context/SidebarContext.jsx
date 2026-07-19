import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024; // Collapse on tablets/small screens by default
    }
    return false;
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Synchronize collapse state on window resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
      // If mobile view is exited, close mobile drawer
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    // Run initially
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        isMobileOpen,
        setIsMobileOpen,
        toggleSidebar,
        toggleMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
