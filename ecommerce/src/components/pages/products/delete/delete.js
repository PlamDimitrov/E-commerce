import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    deleteProduct,
    getAllCategories,
    getAllBrands,
    getOneProduct
} from '../../../../api';
import Error from '../../../propmts/error/error';
import { getDataFromForm } from '../../../../globalFunctions/formsHanler'
import './delete.css';

class ProductDelete extends Component {
    state = {
        isLoading: true,
        product: {},
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

    componentDidMount(event) {
        const product = { id: this.props.match.params.id };
        getOneProduct(product)
            .then(response => {
                this.setState({
                    isLoading: false,
                    product: response
                })
                this.product = this.state.product;
            })

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

    submit = (event) => {
        event.preventDefault();
        deleteProduct(this.product)
            .then((res) => {
                res.ok
                    ? this.props.history.push(`/`)
                    : this.serverErrorHandler(res.json());
                this.setState({
                    gotError: false,
                    showError: false,
                    message: 'No error to show!'
                });

            })
            .catch(err => console.log(err))
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
        return (
            <Fragment>
                <div className="col-sm-4">
                    <div className="product-create-form">
                        <form id="myform" onSubmit={this.submit}>
                            <Error showError={this.state.showError} message={this.state.message} title='Create new product:' />
                            <label>Name:</label>
                            <input type="text" defaultValue={this.state.product.title} disabled={true} />
                            <label>Art. number:</label>
                            <input defaultValue={this.state.product.webId} disabled={true} />
                            <label>Price:</label>
                            <input defaultValue={this.state.product.price} disabled={true} />
                            <label>Condition:</label>
                            <input defaultValue={this.state.product.condition} disabled={true} />
                            <label>Brand:</label>
                            {this.state.brands.length > 0 ?
                                <select defaultValue={this.state.product.brand ? this.state.product.brand._id : null} name="brand" disabled={true}>
                                    {this.state.brands.map(brand => {
                                        return <option key={brand.name} value={brand._id} >
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
                                <select defaultValue={this.state.product.category ? this.state.product.category._id : null} name="category" disabled={true} >
                                    {this.state.product.category ?

                                        this.state.categories.map(category => {
                                            return <option key={category.name} value={category._id} >
                                                {category.name}
                                            </option>
                                        })
                                        :
                                        null
                                    }
                                </select>
                                :
                                <Fragment>
                                    <br />
                                    <span>No categories available! Please create a <Link to="/category-create">category</Link>!</span>
                                    <br />
                                </Fragment>
                            }
                            <label>Description:</label>
                            <textarea defaultValue={this.state.product.description}></textarea>
                            <span className="checkboxConteiner">
                                <input type="checkbox" className="checkbox" defaultChecked={this.state.product.availability} disabled={true} />
                                Product is available
                            </span>
                            <span className="checkboxConteiner">
                                <input type="checkbox" className="checkbox" defaultChecked={this.state.product.featuredItem} disabled={true} />
                                Product is featured
                            </span>
                            <span className="checkboxConteiner">
                                <input type="checkbox" className="checkbox" defaultChecked={this.state.product.recommended} disabled={true} />
                                Product is recommended
                            </span>
                            <img className="image-preview" src={this.state.product.imageUrl} alt="" />
                            <button type="submit" className="btn btn-default">Delete</button>
                        </form>
                    </div>
                </div>
            </Fragment >
        )
    }
};

export default ProductDelete;