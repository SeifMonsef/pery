import React, { Component } from 'react';
import config from 'react-global-configuration';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, Button } from 'semantic-ui-react';
import { cartProductPropType } from './reducer';

class Checkout extends Component {
  getItems() {
    const items = this.props.cart;

    return JSON.stringify(items.map(item =>
      ({ id: item.id, quantity: item.quantity, variationId: _.isNil(item.variationId) ? '' : item.variationId })));
  }

  render() {
    return (
      <Form method="POST" action={config.get('API_CHECKOUT_URL')}>
        <Form.Input type="hidden" name="items" value={this.getItems()} />

        <Button color="blue" fluid type="submit">
          PLACE ORDER
        </Button>
      </Form>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(cartProductPropType).isRequired,
};

export default Checkout;
