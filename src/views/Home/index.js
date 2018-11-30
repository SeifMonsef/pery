import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Container } from 'semantic-ui-react';

import { fetchProducts } from '../ProductList/actions';
import { getProductsFetching, getProducts, productPropType, getProductsHasMore } from '../ProductList/reducer';
import ProductDetails from '../../components/ProductDetails';
import { closeSearch } from '../../components/Bar/actions';
import { isSearchVisible } from '../../components/Bar/reducer';

import './style.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.loadProducts = this.loadProducts.bind(this);
  }
  componentDidMount() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }
    this.readProducts(1);
  }


  getFilteredProducts() {
    const items = this.props.products;
    if (items.length > 0) {
      return items;
    }
    return this.props.products;
  }

  loadProducts() {
    if (this.props.hasMore) {
      const items = this.getFilteredProducts();
      const nextPage = Math.round(items.length / 20) + 1;
      this.readProducts(nextPage);
    }
  }

  readProducts(page) {
    const { dispatch } = this.props;
    dispatch(fetchProducts({
      page,
      order: 'asc',
      orderby: 'title',
      per_page: 10,
    }));
  }

  render() {
    // hasMore must be added here if InfiniteScroll is used
    const { loading, products } = this.props;


    if (loading === 1 && products.length === 0) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <Container>
          <p>No products found.</p>
        </Container>
      );
    }

    const items = this.getFilteredProducts();

    return (
      <div>
        <ProductDetails products={items} title="Home" />
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
  hasMore: PropTypes.bool.isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getProductsFetching(state.products),
  products: getProducts(state.products),
  hasMore: getProductsHasMore(state.products),
  searchVisible: isSearchVisible(state.navbar),

});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts, closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
