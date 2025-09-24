import type { User } from "@/data/user";
import { createContext, useState } from "react";

export type AppContext = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

export const AppContextComponent = createContext({} as AppContext);

export function AppProvider({ children }: any) {
    const [user, setUser] = useState<User>({} as User)

  return (
    <AppContextComponent.Provider value={{
      user,
      setUser
    }}>
      {children}
    </AppContextComponent.Provider>
  );
}
