import React, { Component } from 'react';
import { Card, Header } from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { productPropType } from '../views/ProductList/reducer';
import '../views/ProductList/style.css';


class ProductDetails extends Component {
  render() {
    const list = this.props.products.map(item => (
      {
        id: item.id,
        header: item.name,
        description: _.isEmpty(item.price) ? 0 : item.price + '$',
        image: item.images[0],
        as: Link,
        to: '/product/' + item.id,
      }
    ));

    const filtered = list.filter(items => items.description !== 0);

    return (
      <div>
        <Header textAlign="center"> {this.props.title}</Header>
        <Card.Group items={filtered} itemsPerRow={2} />
      </div>

    );
  }
}

ProductDetails.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
};

export default ProductDetails;
