import React from 'react';
import { useSetState } from 'react-use';
import axios from 'axios';

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  userDisplayName: ''
}

export const ContextProvider = props => {
  const [state, setState] = useSetState(initialState);

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });
  const setLoginError = (loginError) => setState({ loginError });
  const setUserName = (userDisplayName) => setState({ userDisplayName });

  const login = (email, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin(email, password, error => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    })
  }

  const signUp = (firstName, lastName, email, password) => {
    setLoginPending(true);
    setLoginError(null);
    setUserName('');
    userSignUp(firstName, lastName, email, password, response => {
      setLoginPending(false);
      if (200 === response.status) {
        setLoginSuccess(true);
        setUserName(response.data.firstName);

      } else {
        setLoginError(response);
      }
    })
  }

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        signUp,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// fake login
const fetchLogin = (email, password, callback) =>
  setTimeout(() => {
    if (email === 'admin' && password === 'admin') {
      return callback(null);
    } else {
      return callback(new Error('Invalid email and password'));
    }
  }, 1000);

const userSignUp = async (firstName, lastName, email, password, callback) => {
  try {
    const response = await axios.post('http://localhost:8232/api/users', {
      firstName,
      lastName,
      email,
      password,
    });
    if (callback) {
      callback(response);
    }
    return response.data;
  } catch (error) {
    if (error.response.data.message) {
      return callback(error.response.data.message);
    } else {
      return callback(new Error(error.message))
    }
  }
};
