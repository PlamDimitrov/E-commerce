import React, { Component } from 'react';
import { createBrand } from '../../../../api';
import Error from '../../../propmts/error/error';
import './edit.css';

class BrandCreate extends Component {
    state = {
        showError: false,
        gotError: true,
        message: '',
    }

    brand = {
        name: '',
        imageUrl: '',
    }

    getRegisterData = (event) => {
        const { name, value, type, checked } = event.target;
        type === 'checkbox' ? this.brand[name] = checked : this.brand[name] = value
    }

    validateInput = (btn) => {

        if (!this.brand.name) {
            this.setState({
                gotError: true,
                showError: true,
                message: 'Please enter a title!'
            });
            return;
        }
        if (!this.brand.imageUrl) {
            this.setState({
                gotError: true,
                showError: true,
                message: 'Please upload a picture!'
            });
            return;
        }
        this.setState({
            gotError: false,
            showError: false,
            message: 'No error to show!'
        });

        this.sendProduct(btn);
    }

    serverErrorHandler = (err) => {
        err.then(err => {
            if (err.errmsg) {
                if (err.errmsg.includes('name')) {
                    this.setState({
                        gotError: true,
                        showError: true,
                        message: 'The brand already exists!'
                    })
                }
            }
        })
    }

    sendProduct = (btn) => {
        createBrand(this.brand)
            .then((res) => {
                res.ok ? this.resetForm(btn) : this.serverErrorHandler(res.json());
            })
    }

    resetForm = () => {
        document.getElementById('myform').reset();
        this.brand = {
            name: '',
            imageUrl: '',
        }
    }

    submit = (event) => {
        event.preventDefault();
        const btn = event.target;
        this.validateInput(btn);
    }

    cloudinaryWidget = window.cloudinary.createUploadWidget({
        cloudName: 'dmogsuybw',
        uploadPreset: 'cgbbyz73'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            this.brand.imageUrl = result.info.url;
        }
    }
    )
    showClaudinaryWidget = () => {
        this.cloudinaryWidget.open()
    }

    render() {
        return <div className="col-sm-4">
            <div className="product-create-form">
                <form id="myform" onSubmit={this.submit}>
                    <Error showError={this.state.showError} message={this.state.message} title='Create new brand:' />
                    <label>Name:</label>
                    <input type="text" onChange={this.getRegisterData} autoComplete="on" name="name" placeholder="Brand name" />
                    <button type="button" id="upload_widget" onClick={this.showClaudinaryWidget} className="cloudinary-button">Upload files</button>
                    <button type="submit" className="btn btn-default">Create</button>
                </form>
            </div>
        </div>
    }
}

export default BrandCreate;