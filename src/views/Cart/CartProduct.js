import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from 'react-global-configuration';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Item, Grid, Button, Icon, Menu, Divider } from 'semantic-ui-react';
import { cartProductPropType } from './reducer';
import { setQuantity, removeProduct } from './actions';
import './styles.css';

class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.product.quantity,
    };
    this.increaseItemQuantity = this.increaseItemQuantity.bind(this);
    this.reduceItemQuantity = this.reduceItemQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

    /**
   * Get products's by selection
   */

  getProductSelections() {
    if (_.isNil(this.props.product.selections)) {
      return null;
    }


    const description = Object.keys(this.props.product.selections)
      .map(key => _.startCase(key) + ': ' + this.props.product.selections[key])
      .join(', ');


    return (
      <Grid.Row>
        <Grid.Column width={16}>{description}</Grid.Column>
      </Grid.Row>
    );
  }
  sendSelection() {
    return this.props.product.selections;
  }
  /**
   * Increase product quantity
   */
  increaseItemQuantity() {
    const quantity = this.state.quantity + 1;
    this.setState({ quantity });

    const { dispatch } = this.props;
    dispatch(setQuantity(this.props.product.id, this.props.product.variationId, quantity));
  }

  /**
   * Decrease product quantity
   */
  reduceItemQuantity() {
    const { dispatch } = this.props;
    const quantity = this.state.quantity - 1;
    if (quantity === 0) {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => dispatch(removeProduct(this.props.product.id, this.props.product.variationId))

          },
          {
            label: 'No',
            onClick: () => this.increaseItemQuantity()

          }
        ]
      });
    }
    

    this.setState({ quantity });
    dispatch(setQuantity(this.props.product.id, this.props.product.variationId, quantity));
  }

  /**
   * Delete product from the cart
   */
  removeItem() {
    const { dispatch } = this.props;
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(removeProduct(this.props.product.id, this.props.product.variationId))

        },
        {
          label: 'No',
        }
      ]
    });
  }

  render() {
    return (
      <Item.Group className="custom-item">
        <Item>
          <Item.Image src={this.props.product.image} size="small" />
          <Item.Content >
            <Item.Header>
              <Grid columns={3}>
                <Grid.Column width={7}>
                  {this.props.product.name}
                </Grid.Column>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column className="spann" width={6}>
                  <div
                    dangerouslySetInnerHTML={{
            __html: config.get('CURRENCY') + (Math.round(Number(this.props.product.price) * Number(this.state.quantity) * 100) / 100),
          }}
                  />
                </Grid.Column>
              </Grid>
            </Item.Header>

            <Item.Description>
              <div
                dangerouslySetInnerHTML={{
            __html:
                      this.state.quantity + ' x ' + config.get('CURRENCY') + this.props.product.price,
          }}
              />
            </Item.Description>
            <Item.Meta>
              {this.getProductSelections()}
            </Item.Meta>
            {this.props.flag ? (
              <Item.Extra>
                <Menu className="mnuu">
                  <Menu.Item position="left">
                    <Button onClick={this.reduceItemQuantity} className="Back blackk">
                      <Icon name="minus" id="minus" />
                    </Button>
                  </Menu.Item>
                  <Menu.Item className="bigFont">
                    { this.state.quantity }
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button onClick={this.increaseItemQuantity} className="Back blackk">
                      <Icon name="plus" />
                    </Button>
                  </Menu.Item>
                </Menu>
                <Button icon className="cart-delete" onClick={this.removeItem}>
                  <Icon name="trash" />
                </Button>
              </Item.Extra>

          ) : null}
          </Item.Content>
        </Item>
        <Divider fitted />
      </Item.Group>
    );
  }
}

CartProduct.propTypes = {
  product: cartProductPropType.isRequired,
  dispatch: PropTypes.func.isRequired,
  flag: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ setQuantity, removeProduct }, dispatch));
}

export default connect(null, mapDispatchToProps)(CartProduct);
