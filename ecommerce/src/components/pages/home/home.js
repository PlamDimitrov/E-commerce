import React, { Fragment, Component } from 'react';
import './home.css';

import SidebarLeft from '../../sidebar-left/sidebar-left';
import Items from './items/items';
import Loader from '../../propmts/loader/loader';
import { getAllProducts } from '../../../api';

class Home extends Component {
    state = {
        isLoading: true,
        products: [],
    }

    componentDidMount() {
        getAllProducts()
            .then(response => {
                this.setState({
                    isLoading: false,
                    products: response
                })
            })
    }

    render() {
        return <Fragment>
            <SidebarLeft />
            {this.state.isLoading ? <Loader /> : null}
            <Items products={this.state.products} />
        </Fragment>
    }
}

export default Home;