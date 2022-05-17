import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import {
    createProduct,
    getAllCategories,
    getAllBrands,
} from '../../../../api';
import Error from '../../../propmts/error/error';
import { getDataFromForm } from '../../../../globalFunctions/formsHanler'

class CreateProduct extends Component {
    state = {
        showError: false,
        gotError: true,
        message: '',
        brands: [],
        categories: []
    }

    product = {
        title: '',
        webId: '',
        price: '',
        imageUrl: '',
        description: '',
        availability: false,
        featuredItem: false,
        recommended: false,
        condition: '',
        category: '',
        brand: '',
    }

    componentDidMount() {
        getAllCategories().then(response => {
            this.setState({
                categories: response,
            })
        })
        getAllBrands().then(response => {
            this.setState({
                brands: response,
            })
        })
    }

    getRegisterData = (event) => getDataFromForm(event, this.product)

    sendProduct = () => {
        this.product.imageUrl = "asdasdsadasda"; // Just for testin! Remove after!

        return createProduct(this.product)
            .then((res) => {
                res.ok ? this.resetForm() : this.serverErrorHandler(res.json());
                this.setState({
                    gotError: false,
                    showError: false,
                    message: 'No error to show!'
                });
            })

    }

    validateInput = () => {
        const productForm = yup.object({
            title: yup
                .string()
                .required('Please enter a title!'),
            webId: yup
                .string()
                .required('Please enter an ID!'),
            price: yup
                .string()
                .required('Please enter price!'),
            imageUrl: yup
                .string(),
            // .required('Please upload a picture!'),
            condition: yup
                .string()
                .required('Please enter a condition!'),
            category: yup
                .string()
                .required('Please pick a category!'),
            brand: yup
                .string()
                .required('Please pick a brand!'),
            description: yup
                .string()
                .required('Please enter a description!')
                .test('length', 'The description must be more than 5 characters', val => val.length >= 5),
        });

        productForm.validate({
            title: this.product.title,
            webId: this.product.webId,
            price: this.product.price,
            imageUrl: this.product.imageUrl,
            condition: this.product.condition,
            description: this.product.description,
            brand: this.product.brand,
            category: this.product.category,
        })
            .then(isValid => this.sendProduct())
            .catch(error => {
                this.setState({
                    gotError: true,
                    showError: true,
                    message: error.message
                });
            });
    }

    serverErrorHandler = (err) => {
        err.then(err => {
            if (err.errmsg) {
                if (err.errmsg.includes('webId')) {
                    this.setState({
                        gotError: true,
                        showError: true,
                        message: 'The ID already exists!'
                    })
                }
            }
        })
    }

    resetForm = () => {
        document.getElementById('myform').reset();
        this.product = {
            title: '',
            webId: '',
            price: '',
            imageUrl: '',
            description: '',
            availability: false,
            featuredItem: false,
            recommended: false,
            condition: '',
        }
    }

    submit = (event) => {
        event.preventDefault();
        const btn = event.target;
        this.validateInput(btn);
    }

    // Cloudinary widget
    cloudinaryWidget = window.cloudinary.createUploadWidget({
        cloudName: 'dmogsuybw',
        uploadPreset: 'cgbbyz73'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            this.product.imageUrl = result.info.url;
        }
    })
    showClaudinaryWidget = () => {
        this.cloudinaryWidget.open()
    }

    render() {
        return <div className="col-sm-4">
            <div className="product-create-form">
                <form id="myform" onSubmit={this.submit}>
                    <Error showError={this.state.showError} message={this.state.message} title='Create new product:' />
                    <label>Name:</label>
                    <input type="text" onChange={this.getRegisterData} autoComplete="on" name="title" placeholder="Product title" />
                    <label>Art. number:</label>
                    <input type="number" min="0" onChange={this.getRegisterData} autoComplete="on" name="webId" placeholder="Product ID number" />
                    <label>Price:</label>
                    <input type="number" min="0" onChange={this.getRegisterData} autoComplete="on" name="price" placeholder="Product price $" />
                    <label>Condition:</label>
                    <input type="text" onChange={this.getRegisterData} autoComplete="on" name="condition" placeholder="Product condition" />
                    <label>Brand:</label>
                    {this.state.brands.length > 0 ?
                        <select defaultValue="defaut" name="brand" onChange={this.getRegisterData}>
                            <option value="defaut" disabled>
                                Please select a brand:
                            </option>
                            {this.state.brands.map(brand => {
                                return <option key={brand.name} value={brand}>
                                    {brand.name}
                                </option>
                            })}
                        </select>
                        :
                        <Fragment>
                            <br />
                            <span>No brands available! Please create a <Link to="/brand-create">brand</Link>!</span>
                            <br />
                        </Fragment>
                    }
                    <label>Category:</label>
                    {this.state.categories.length > 0 ?
                        <select defaultValue="defaut" name="category" onChange={this.getRegisterData}>
                            <option value="defaut" disabled>
                                Please select a category:
                            </option>
                            {this.state.categories.map(category => {
                                return <option key={category.name} value={[category]}>
                                    {category.name}
                                </option>
                            })}
                        </select>
                        :
                        <Fragment>
                            <br />
                            <span>No categories available! Please create a <Link to="/category-create">category</Link>!</span>
                            <br />
                        </Fragment>
                    }
                    <label>Description:</label>
                    <textarea onChange={this.getRegisterData} name='description'></textarea>
                    <span className="checkboxConteiner">
                        <input type="checkbox" onChange={this.getRegisterData} autoComplete="off" className="checkbox" name="availability" />
                        Product is available
                    </span>
                    <span className="checkboxConteiner">
                        <input type="checkbox" onChange={this.getRegisterData} autoComplete="off" className="checkbox" name="featuredItem" />
                        Product is featured
                    </span>
                    <span className="checkboxConteiner">
                        <input type="checkbox" onChange={this.getRegisterData} autoComplete="off" className="checkbox" name="recommended" />
                        Product is recommended
                    </span>
                    <button type="button" id="upload_widget" onClick={this.showClaudinaryWidget} className="cloudinary-button">Upload files</button>
                    <button type="submit" className="btn btn-default">Create</button>
                </form>
            </div>
        </div>
    }
}

export default CreateProduct;