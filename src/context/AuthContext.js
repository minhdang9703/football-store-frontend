import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("currentUser");
      if (raw) setCurrentUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem("currentUser", JSON.stringify(currentUser));
      else localStorage.removeItem("currentUser");
    } catch {}
  }, [currentUser]);

  function getUsers() {
    try {
      const raw = localStorage.getItem("users");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  async function register({ name, email, password }) {
    // simple client-side mock: check existing, then save
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      throw new Error("Email đã được sử dụng");
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return newUser;
  }

  async function login({ email, password }) {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error("Email hoặc mật khẩu không đúng");
    setCurrentUser({ id: found.id, name: found.name, email: found.email });
    return found;
  }

  function logout() {
    setCurrentUser(null);
  }

  // update current user's profile (e.g. avatar, name)
  function updateProfile(updates = {}) {
    try {
      // update saved users list if present
      const users = getUsers();
      const id = currentUser?.id;
      if (id) {
        const idx = users.findIndex(u => u.id === id);
        if (idx !== -1) {
          users[idx] = { ...users[idx], ...updates };
          saveUsers(users);
        }
      }
      // update currentUser state and localStorage
      setCurrentUser(prev => {
        const next = { ...(prev || {}), ...updates };
        try {
          if (next) localStorage.setItem("currentUser", JSON.stringify(next));
          else localStorage.removeItem("currentUser");
        } catch {}
        return next;
      });
    } catch (err) {
      // ignore
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
