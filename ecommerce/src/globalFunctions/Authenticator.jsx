import React from 'react';
import { StoreContext } from "./Store/Store";
import { loginSuccess } from "./Store/actions";

const Auth = ({ children }) => {
    const { dispatch } = React.useContext(StoreContext);
    React.useEffect(() => {
        fetch("https://localhost:7044/api/Users/auth", { credentials: "include" })
            .then(res =>
                res.status === 200
                    ? res.json()
                    : res.text().then(text => Promise.reject(text))
            )
            .then(user => dispatch(loginSuccess(user)))
            .catch((err) => {
                console.log(`Error from server: ${err}`);
                dispatch(loginSuccess(null));
            });
    }, []);

    return <>{children}</>;
};

export default Auth;