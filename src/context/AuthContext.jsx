import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (payload) => {
    const name = payload?.name?.trim();
    const email = payload?.email?.trim();

    if (!name || !email) {
      return { ok: false, message: 'Preencha nome e e-mail para entrar na Carmelita Festas.' };
    }

    setUser({ name, email, joinedAt: new Date().toISOString() });
    return { ok: true, message: `Bem-vindo(a), ${name}. Login simulado com sucesso.` };
  };

  const register = (payload) => {
    const name = payload?.name?.trim();
    const email = payload?.email?.trim();
    const password = payload?.password?.trim();

    if (!name || !email || !password) {
      return { ok: false, message: 'Preencha todos os campos para concluir o cadastro ficticio.' };
    }

    setUser({ name, email, joinedAt: new Date().toISOString() });
    return { ok: true, message: 'Cadastro simulado concluido. Sua conta Carmelita Festas esta ativa.' };
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de AuthProvider.');
  }
  return context;
};
