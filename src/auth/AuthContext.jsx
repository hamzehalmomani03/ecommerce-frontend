import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(email, password) {
    const savedUser = localStorage.getItem("registeredUser");

    if (!savedUser) {
      return {
        success: false,
        message: "No registered account found.",
      };
    }

    const registeredUser = JSON.parse(savedUser);

    if (
      registeredUser.email !== email ||
      registeredUser.password !== password
    ) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

   const loggedInUser = {
  name: registeredUser.name,
  email: registeredUser.email,
  role: registeredUser.role,
};
    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return {
      success: true,
    };
  }

  function register(name, email, password) {
    const existingUser =
      localStorage.getItem("registeredUser");

    if (existingUser) {
      return {
        success: false,
        message: "An account already exists.",
      };
    }

 const newUser = {
  name,
  email,
  password,
  role: email === "admin@test.com" ? "admin" : "customer",
};

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(newUser)
    );

    return {
      success: true,
    };
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}