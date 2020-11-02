import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface Player {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  player: Player;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  player: Player;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updatePlayer(player: Player): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Championship:token');
    const player = localStorage.getItem('@Championship:player');

    if (token && player) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, player: JSON.parse(player) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, player } = response.data;

    localStorage.setItem('@Championship:token', token);
    localStorage.setItem('@Championship:player', JSON.stringify(player));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, player });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Championship:token');
    localStorage.removeItem('@Championship:player');

    setData({} as AuthState);
  }, []);

  const updatePlayer = useCallback(
    (player: Player) => {
      localStorage.setItem('@Championship:player', JSON.stringify(player));
      setData({
        token: data.token,
        player,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ player: data.player, signIn, signOut, updatePlayer }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
