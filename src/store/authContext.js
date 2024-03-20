import React, {
  useState,
  useMemo,
  useContext,
  useCallback,
  createContext,
  useLayoutEffect,
} from 'react';
import { getItem, removeItem, setItem } from '../utils/AsyncStorage';
import LSKeys from '../constants/LSKeys';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('The component must be wrapped by the provider!');
  }
  return context;
};

export const AuthProvider = props => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(false);
  const [activeAccountType, setActiveAccountType] = useState(null);


  // -- Handlers

  useLayoutEffect(() => {
    (async () => {
      const resultStr = await getItem(LSKeys.sessionInfo);
      if (resultStr) {
        const result = JSON.parse(resultStr);
        setUser(result);
        setToken(result.token);
        setActiveAccountType(result.type)
      }
    })();
  }, []);




  const onLogin = useCallback(async usr => {
    setUser(usr);
    setToken(usr.token);
    setActiveAccountType(usr.type)
    console.log('USER:: ', usr);
    // console.log('TKN:: ', usr.token);
    // if (usr.isSessionSaved) {
    await setItem(LSKeys.sessionInfo, JSON.stringify(usr));
    await setItem(LSKeys.token, JSON.stringify(usr.token));
    // }
  }, []);

  const onLogout = useCallback(async () => {
    console.log("test logout");
    setUser(null);
    setToken(null);
    setActiveAccountType(null)
    await removeItem(LSKeys.sessionInfo);
    await removeItem(LSKeys.token);
    console.log(getItem(LSKeys.token));
  }, []);

  const value = useMemo(() => {
    const setters = {
      setUser,
      setEmail,
      setToken,
      setPassword,
    };

    const functions = {
      onLogin,
      onLogout,
    };
    const values = {
      user,
      email,
      token,
      password,
      activeAccountType
    };

    return { values, functions, setters };
  }, [
    password,
    email,
    token,
    user,
    activeAccountType,
    setUser,
    onLogin,
    onLogout,
    setToken,
    setEmail,
    setPassword,
  ]);

  return <AuthContext.Provider value={value} {...props} />;
};
