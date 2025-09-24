import { AppContextComponent } from "@/contexts/app-context";
import { useContext } from "react";

export function useApp() {
  const context = useContext(AppContextComponent);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
}
