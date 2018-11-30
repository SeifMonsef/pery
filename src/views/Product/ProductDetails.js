import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import config from 'react-global-configuration';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import 'react-image-gallery/styles/css/image-gallery.css';
import { toastr } from 'react-redux-toastr';
import { Header, Card, Segment, Button, Menu, Icon } from 'semantic-ui-react';
import { productPropType } from '../ProductList/reducer';
import { addProduct } from '../Cart/actions';
import Variations from '../../components/Variations';
import SocialBox from './SocialBox';
import Reviews from '../../components/Reviews';
import Rating from '../../components/Rating/index';

import './styles.css';

class ProductDetails extends Component {
  static isAnyCached(images) {
    return images
      .map((image) => {
        const newImage = new Image();
        newImage.src = image.original;
        return newImage.complete;
      })
      .filter(isCached => isCached === false);
  }

  constructor(props) {
    super(props);

    this.state = {
      selections: null,
      variationId: null,
    };

    this.receiveSelections = this.receiveSelections.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  getCategories() {
    return this.props.product.categories.map(category => category.name).join(', ');
  }

  getImageGallery() {
    return this.props.product.images.map(image => ({ original: image.src }));
  }

  /**
   * Modify component's state when a variation is selected.
   * @param {Object} selections
   * @param {Number} variationId
   */
  receiveSelections(selections, variationId) {
    this.setState({ selections, variationId });
  }

  /**
   * Add product to cart.
   * Display a warning if the product has variations and attributes were not selected.
   */
  addItem() {
    if (this.props.product.variations.length !== 0) {
      if (_.isNull(this.state.selections)) {
        toastr.warning('Please make a selection for all of the products actions');
        return;
      }
    }

    const { dispatch } = this.props;
    const product = this.props.product;

    dispatch(addProduct(
      product.id,
      product.name,
      product.price,
      product.images[0].src,
      this.state.variationId,
      this.state.selections,
    ));

    toastr.success('Added to Cart', product.name + ' was added to your shopping cart.');
  }

  render() {
    const anyCached =
      ProductDetails.isAnyCached(this.getImageGallery())[0] === false
        ? ProductDetails.isAnyCached(this.getImageGallery())[0]
        : true;

    return (
      <div >
        <Menu secondary>
          <Menu.Menu position="left">
            <Link to={'/category/' + this.props.product.categories[0].id}>
              <Icon name="left arrow" color="black" className="arrow" />
            </Link>
          </Menu.Menu>
          <Menu.Menu >
            <h3 className="Headerr" >{this.props.product.name}</h3>
          </Menu.Menu>
          <Menu.Menu position="right">
          </Menu.Menu>
        </Menu>
        <Card centered>
          <ImageGallery
            items={this.getImageGallery()}
            slideDuration={550}
            showPlayButton={false}
            showThumbnails={false}
            showNav={window.navigator.onLine || anyCached}
            disableSwipe={!window.navigator.onLine || !anyCached}
          />
          {this.props.product.rating_count > 0 ? (
            <Card.Content extra>
              <Rating
                rating={Math.round(Number(this.props.product.average_rating))}
                ratingCount={this.props.product.rating_count}
              />
            </Card.Content>
          ) : null}
          <Card.Content><span className="font-types">{this.props.product.name}</span></Card.Content>
          {this.props.product.categories.length === 0 ? null : (
            <Card.Content>{this.getCategories()}</Card.Content>
          )}
          <Card.Content >{this.props.product.in_stock ? <span className="in-stock">In Stock</span> : <span className="out-stock">Out of Stock</span>}</Card.Content>
          {this.props.product.price ?
            (<Card.Content>
              <div className="font-types" dangerouslySetInnerHTML={{ __html: config.get('CURRENCY') + this.props.product.price }} />
             </Card.Content>) : null}
          {this.props.product.variations.length === 0 ? null : (
            <Variations
              sendSelections={this.receiveSelections}
              productId={this.props.product.id}
              variationIds={this.props.product.variations}
            />
          )}
        </Card>
        {this.props.product.description.length === 0 ? null : (
          <Card centered>
            <Card.Content>
              <Card.Header as={Header} size="tiny">
                Description
              </Card.Header>
              <Card.Description>
                <div dangerouslySetInnerHTML={{ __html: this.props.product.description }} />
              </Card.Description>
            </Card.Content>
          </Card>
        )}
        {this.props.product.backorders_allowed || this.props.product.in_stock ? (
          <Segment basic textAlign="center" >
            <Button positive compact circular size="big" className="but" onClick={this.addItem} >ADD TO CART</Button>
          </Segment>
          ) : null}
        <Reviews productId={this.props.product.id} />
        <SocialBox permalink={this.props.product.permalink} />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  product: productPropType.isRequired,
};

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ addProduct }, dispatch));
}

export default connect(null, mapDispatchToProps)(ProductDetails);
