import { createContext, useContext, useEffect, useState } from "react";
interface AuthContextType {
    user: null;
    setUser: (u: null) => void;
    logout: () => void;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    logout: () => {},
    refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        // console.log("Token from localStorage:", token);
        const fetchUser = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_LOCAL_API}/user/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const json = await res.json();
                    setUser(json.data);
                } else {
                    localStorage.removeItem("token");
                    setUser(null);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    const refreshUser = () => {
        const token = localStorage.getItem("token");
        const fetchUser = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_LOCAL_API}/user/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const json = await res.json();
                    setUser(json.data);
                } else {
                    localStorage.removeItem("token");
                    setUser(null);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setUser(null);
            }
        };
        fetchUser();
    };

    const logout = () => {
        const token = localStorage.getItem("token");
        const logoutUser = async () => {
            try {
                await fetch(`${import.meta.env.VITE_LOCAL_API}/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });
            } catch (err) {
                console.error("Error during logout:", err);
            }
        };
        logoutUser();
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/login"; // load lại trang để reset state
    };

    return <AuthContext.Provider value={{ user, setUser, logout, refreshUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
