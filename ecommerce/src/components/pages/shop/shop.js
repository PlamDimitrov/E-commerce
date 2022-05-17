import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";

import SidebarLeft from '../../sidebar-left/sidebar-left';
import Loader from '../../propmts/loader/loader';
import Product from '../../../components/product/product';
import { getAllProducts } from '../../../api';

class Shop extends Component {
    state = {
        isLoading: true,
        products: [],
        pages: [],
        page: 1,
    }

    search = '';

    getSearchData = (event) => {
        switch (event.target.name) {
            case 'search':
                this.search = event.target.value;
                break;
            default:
                break;
        }
        setTimeout(() => getAllProducts()
            .then(response => {
                this.setState({
                    isLoading: false,
                    products: response
                })
                return response;
            })
            .then((response) => {
                const allPages = this.split(this.searchByName(response, this.search));
                this.setState({
                    pages: allPages
                })
            })
            , 1500)
    }

    searchByName = function (array, name) {
        const productsToShow = [];
        array.forEach(product => {
            const productName = product['title'].toLowerCase();
            const nameToSearch = name.toLowerCase();
            if (productName.includes(nameToSearch)) {
                productsToShow.push(product);
            }
        });
        return productsToShow
    }

    componentDidMount() {
        getAllProducts()
            .then(response => {
                this.setState({
                    isLoading: false,
                    products: response
                })
            })
            .then(() => {
                const allPages = this.split(this.state.products);
                this.setState({
                    pages: allPages
                })
            })
    }

    split = (arey) => {
        const pageSize = 3;
        const elements = arey.map(e => e);
        const pages = [];
        let chunk = [];
        while (elements.length !== 0) {
            for (let i = 0; i < pageSize; i++) {
                const elemet = elements.shift();
                if (elemet) {
                    chunk.push(elemet);
                }
            }
            pages.push(chunk);
            chunk = [];
        }
        return pages;
    }

    render() {
        const currentPage = this.props.match.params.page;

        return <Fragment>
            <SidebarLeft />
            {this.state.isLoading
                ? <Loader />
                : <div className="col-sm-9 padding-right">
                    <div className="features_items">
                        <div className="col-sm-3">
                            <div className="search_box pull-right">
                                <input type="text" name="search" onChange={this.getSearchData} placeholder="Search" />
                            </div>
                        </div>
                        <h2 className="title text-center">All products:</h2>
                        {this.state.pages.length !== 0 && this.state.pages[currentPage].map(product => <Product key={product.webId} product={product} />)}
                        <ul className="pagination">
                            {this.state.pages.length !== 0
                                ? this.state.pages.map((page, index) => {
                                    return <li key={index} className={+currentPage === index ? 'active' : null} >
                                        <Link to={`/shop/${index}`}>{index + 1}</Link>
                                    </li>
                                })
                                : <Fragment>
                                    <span>No products are available! Please create a <Link to="/product-create">product</Link>!</span>
                                    <br />
                                    <li className='active'>
                                        <Link to={`/shop/0`}>1</Link>
                                    </li>
                                </Fragment>
                            }
                        </ul>
                    </div>
                </div>
            }
        </Fragment >
    }
}
export default Shop;