import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Segment, Header, Menu, Icon, Button, Divider } from 'semantic-ui-react';
import { getCart, cartProductPropType } from './reducer';
import CartProduct from './CartProduct';
import CardSummary from './CartSummary';
import './styles.css';
import { closeSearch } from '../../components/Bar/actions';
import { isSearchVisible } from '../../components/Bar/reducer';
import Bar from '../../components/Bar/Bar';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
    };
    this.changeBool = this.changeBool.bind(this);
  }
  componentDidMount() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }
  }

  getTotalPrice() {
    const total = _.sumBy(this.props.cart, item => (Number(item.quantity) * Number(item.price)));
    return Math.round(total * 100) / 100;
  }
  changeBool() {
    this.setState({ flag: !this.state.flag });
  }

  render() {

    return _.isEmpty(this.props.cart) ? (
      <div>
        <Bar />
        <Segment textAlign="center">Your Cart is Empty</Segment>
      </div>
    ) : (
      <div className="pad">
        <Header textAlign="center">
          <Menu secondary>
            <Menu.Menu position="left">
              <Link to="/">
                <Icon name="left arrow" color="black" className="arrow" />
              </Link>
            </Menu.Menu>
            <Menu.Menu >
              <h3 className="Head" >Shopping Cart</h3>
            </Menu.Menu>
            <Menu.Menu position="right" className="up">
              <Button size="small" className="bordless" onClick={this.changeBool} > EDIT </Button>
            </Menu.Menu>
          </Menu>

        </Header>
        <Divider fitted />
        {this.props.cart.map(product => (
          <CartProduct
            key={_.isNil(product.variationId) ? product.id : product.variationId}
            product={product}
            flag={this.state.flag}
          />
          ))}
        <CardSummary total={this.getTotalPrice()} cart={this.props.cart} />
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(cartProductPropType).isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: getCart(state.cart),
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);

