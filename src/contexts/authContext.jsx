import { createContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      // location.pathname === '/' && navigate('/timeline');
    } else {
      // navigate('/');
    }
  }, []); 

  function logOut() {
    setUser(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;