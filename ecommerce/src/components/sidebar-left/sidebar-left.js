import React from 'react';
import './sidebar-left.css';

import Category from './category/category';
import Brands from './brands/brands';

const SidebarLeft = () => (

    <div className="col-sm-3">
        <div className="left-sidebar">
            <Category />
            <Brands />
        </div>
    </div>
);

export default SidebarLeft;