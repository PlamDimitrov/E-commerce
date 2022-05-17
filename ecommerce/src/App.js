import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Store, { StoreContext } from "./globalFunctions/Store/Store";
import Auth from "./globalFunctions/Authenticator";

// Components
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Slider from './components/slider/slider';
import Loader from './components/propmts/loader/loader';
// Pages
import Home from './components/pages/home/home';
import Shop from './components/pages/shop/shop';
import Contact from './components/pages/contacts/contacts';
import UserControl from './components/user/loginOrRegister/UserControl';
import LogOut from './components/user/loginOrRegister/logOut/logOut';
import notFound from './components/pages/notFound/notFound';
// Product
import ProductDetails from './components/pages/products/details/details';
import ProductCreate from './components/pages/products/create/create';
import ProductEdit from './components/pages/products/edit/edit';
import ProductDelete from './components/pages/products/delete/delete';
// Brand
import BrandPage from './components/pages/brands/brandPage/brandPage';
import BrandCreate from './components/pages/brands/create/create';
import BrandProgucts from './components/pages/brands/brandProducts/brandProgucts';
import BrandEdit from './components/pages/brands/edit/edit';
// Category
import CategoryPage from './components/pages/categories/categoryPage/categoryPage';
import CategoryCreate from './components/pages/categories/create/create';
import CategoryProgucts from './components/pages/categories/categoryProducts/categoryProgucts';
// import CategoryEdit from './components/pages/categories/edit/edit';

function App() {
  return (
    < Store >
      <Auth>
        <StoreContext.Consumer>
          {({ state }) => {
            const user = state.user;
            const hasError = false;
            let isLogged = !!state.user;
            return user === undefined
              ? <Loader />
              : <div className="App">
                <Header user={user} isLogged={isLogged} />
                <Route path='/' exact component={Slider} />
                <Route path='/home' exact component={Slider} />
                <section>
                  <div className="container">
                    <div className="row">
                      <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/home' exact component={Home} />
                        <Route path='/contacts' exact component={Contact} />
                        <Route path='/shop/:page' exact component={Shop} />
                        <Route path='/loginOrRegister' exact component={!isLogged ? () => <UserControl hasError={hasError} /> : () => <Redirect to='/' />} />
                        <Route path='/logOut' exact component={isLogged ? LogOut : () => <Redirect to='/' />} />
                        {/* Product */}
                        <Route path='/product-create' exact component={isLogged ? ProductCreate : () => <Redirect to='/' />} />
                        <Route path='/product-edit/:id' exact component={isLogged ? ProductEdit : () => <Redirect to='/' />} />
                        <Route path='/product-delete/:id' exact component={isLogged ? ProductDelete : () => <Redirect to='/' />} />
                        <Route path='/product-details/:id' exact component={ProductDetails} />
                        {/* Brand */}
                        <Route path='/brand-create' exact component={isLogged ? BrandCreate : () => <Redirect to='/' />} />
                        <Route path='/brands' exact component={BrandPage} />
                        <Route path='/brand/:id' exact component={BrandProgucts} />
                        <Route path='/product-edit/:id' exact component={BrandEdit} />
                        {/* Category */}
                        <Route path='/category-create' exact component={isLogged ? CategoryCreate : () => <Redirect to='/' />} />
                        <Route path='/categories' exact component={CategoryPage} />
                        <Route path='/category/:id' exact component={CategoryProgucts} />
                        {/* <Route path='/product-edit/:id' exact component={CategoryEdit} /> */}
                        <Route component={notFound} />
                      </Switch>
                    </div>
                  </div>
                </section>
                <Footer />
              </div>
          }}
        </StoreContext.Consumer>
      </Auth>
    </Store >
  );
}

export default App;