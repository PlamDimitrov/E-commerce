import React from 'react';
import Login from './login/login';
import Register from './register/register';
import './UserControl.css';
const { Fragment } = React;

const UserCotrol = ({ hasError }) => {
    return <Fragment>
        <Login hasError={hasError} />
        <div className="col-sm-1">
            <h2 className="or">OR</h2>
        </div>
        <Register />
    </Fragment>
}

export default UserCotrol;