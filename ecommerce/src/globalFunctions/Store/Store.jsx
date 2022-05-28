import React from 'react';
import { ActionTypes, loginSuccess, loginFailure, logoutSuccess, logoutFailure } from './actions';
import { logInUser, logOutUser } from '../../api';

export const StoreContext = React.createContext({});

const initialState = {
  user: undefined,
  error: null
};

let hasError = false;

function init(state) {
  return initialState;
}

const asyncActionMap = {
  [ActionTypes.Login]:
    ({ user }) => logInUser(user)
      .then(res => {
        if (res.status === 401) {
          hasError = true;
        } else {
          hasError = false;
        }
        console.log(`HERE: ${JSON.stringify(res)}`);
        return res;
      })
      .then(res => res.json())
      .then(res => hasError ? loginFailure(res) : loginSuccess(res)),
  // .catch(error => loginFailure(error)),
  [ActionTypes.Logout]:
    () => logOutUser()
      .then(() => logoutSuccess())
      .catch(error => logoutFailure(error))
}

const actionMap = {
  [ActionTypes.Login]: (state) => ({ ...state, error: null }),
  [ActionTypes.LoginSuccess]: (state, { user }) => ({ ...state, user }),
  [ActionTypes.LogoutSuccess]: (state) => ({ ...state, user: null }),
  [ActionTypes.LoginFailure]: (state, { error }) => ({ ...state, error })
}

const storeReducer = (state, action) => {
  const handler = actionMap[action.type];
  return handler ? handler(state, action.payload) : state;
}

const Store = ({ children }) => {

  const [state, dispatch] = React.useReducer(storeReducer, initialState, init);

  const store = React.useMemo(() => ({
    state,
    dispatch: (action) => {
      const asyncActionHandler = asyncActionMap[action.type];
      if (asyncActionHandler) {
        asyncActionHandler(action.payload).then(dispatch);
      }
      dispatch(action);
    }
  }), [state, dispatch]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export default Store;