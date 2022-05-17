import React, { Component } from 'react';
import { createCategory } from '../../../../api';
import Error from '../../../propmts/error/error';
import './create.css';

class CategoryCreate extends Component {
    state = {
        showError: false,
        gotError: true,
        message: '',
    }

    category = {
        name: '',
        imageUrl: '',
        products: [],
    }

    getRegisterData = (event) => {
        const { name, value, type, checked } = event.target;
        type === 'checkbox' ? this.category[name] = checked : this.category[name] = value
        console.log(this.category);

    }

    validateInput = (btn) => {

        if (!this.category.name) {
            this.setState({
                gotError: true,
                showError: true,
                message: 'Please enter the name of the category!'
            });
            return;
        }
        if (!this.category.imageUrl) {
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

        this.sendBrand(btn);
    }

    serverErrorHandler = (err) => {
        err.then(err => {
            if (err.errmsg) {
                if (err.errmsg.includes('name')) {
                    this.setState({
                        gotError: true,
                        showError: true,
                        message: 'The category already exists!'
                    })
                }
            }
        })
    }

    sendBrand = (btn) => {
        createCategory(this.category)
            .then((res) => {
                res.ok ? this.resetForm(btn) : this.serverErrorHandler(res.json());
            })
    }

    resetForm = () => {
        document.getElementById('myform').reset();
        this.category = {
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
            this.category.imageUrl = result.info.url;
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
                    <Error showError={this.state.showError} message={this.state.message} title='Create new category:' />
                    <label>Name:</label>
                    <input type="text" onChange={this.getRegisterData} autoComplete="on" name="name" placeholder="Category name" />
                    <button type="button" id="upload_widget" onClick={this.showClaudinaryWidget} className="cloudinary-button">Upload files</button>
                    <button type="submit" className="btn btn-default">Create</button>
                </form>
            </div>
        </div>
    }
}

export default CategoryCreate;