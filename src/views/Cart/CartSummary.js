import React from 'react';
import config from 'react-global-configuration';
import PropTypes from 'prop-types';
import { Grid, Card, Header } from 'semantic-ui-react';
import { cartProductPropType } from './reducer';
import Checkout from './Checkout';

const CartSummary = props => (
  <Card centered className="cart-summary">
    <Card.Content>
      <Card.Header as={Header} textAlign="left">
        Order Summary
      </Card.Header>
      <Grid doubling>
        <Grid.Row>
          <Grid.Column width={11}>Total</Grid.Column>
          <Grid.Column textAlign="right" width={5}>
            <div dangerouslySetInnerHTML={{ __html: config.get('CURRENCY') + props.total }} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Checkout cart={props.cart} />
    </Card.Content>
  </Card>
);

CartSummary.propTypes = {
  total: PropTypes.number.isRequired,
  cart: PropTypes.arrayOf(cartProductPropType).isRequired,
};

export default CartSummary;
