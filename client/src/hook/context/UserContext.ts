
import { createContext } from "react";
interface User {
    name: string | null;
    role: string | null;
}
const UserContext = createContext<User | null>(null);
export default UserContext;

    