import { createContext, useContext, useState } from "react";
import React from "react";
export const UserContext = createContext();
export const UseThemeContext = () => useContext(UserContext);
function GlobalContext({ children }) {
  const [Cdata, SetCdata] = useState(0);
  const [Phase, SetPhase] = useState("Index");
  /**
   * all phase Index, Create,Update
   */

  return (
    <UserContext.Provider
      value={{
        Cdata,
        SetCdata,
        Phase,
        SetPhase,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default GlobalContext;
