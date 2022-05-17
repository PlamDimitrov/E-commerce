import React from 'react';
import './error.css';
const { Fragment } = React;

const ErrorMessage = (props) => {
    return (
        <Fragment>
            {
                props.showError ?
                    <div className="alert alert-danger" role="alert">{props.message}</div> :
                    <h2>{props.title}</h2>
            }
        </Fragment>
    )

};
export default ErrorMessage;