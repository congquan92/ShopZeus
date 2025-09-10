
import { createContext } from "react";
const UserContext = createContext<{ name: string , role : string } | undefined>(undefined);
export default UserContext;

    