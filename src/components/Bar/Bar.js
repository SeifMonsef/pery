import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import config from 'react-global-configuration';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon, Segment, Divider, Label, Form, Input, Header, Container } from 'semantic-ui-react';
import { openMenu, openSearch, closeSearch } from './actions';
import { isSearchVisible } from './reducer';
import { getCart } from '../../views/Cart/reducer';


import './Header.css';
import './Bar.css';

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      toSearchPage: false,
    };

    this.showSidebar = this.showSidebar.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openSearch = this.openSearch.bind(this);
  }


  getQuantity() {
    const { cart } = this.props;
    return cart.reduce((quantity, item) => item.quantity + quantity, 0);
  }

  setSearch(e) {
    this.setState({ search: e.target.value });
  }

  /**
   * Handle search form submit.
   * Set state for redirecting to search page and close search box.
   */
  handleSubmit() {
    this.setState({ toSearchPage: this.state.search, search: '' }, () => this.props.closeSearch());
  }

  /**
   * Open search box when icon is clicked.
   * Reset search input and redirect when the search is opened.
   */
  openSearch() {
    this.setState({ toSearchPage: false, search: '' }, () => this.props.openSearch());
  }
  showSidebar(e) {
    e.stopPropagation();
    this.props.openMenu();
  }
  render() {
    const { searchVisible } = this.props;

    return (
      <Container className="stickk">
        <Segment size="tiny" basic className=" white">
          <Menu secondary>
            <Menu.Menu position="left" onClick={this.showSidebar} className="align" >
              <Icon name="content" color="black" onClick={this.showSidebar} />
            </Menu.Menu>
            <Menu.Menu >
              {searchVisible === false ?
          (
            <Link to="/">
              <Header className="align2" >{config.get('SHOP_NAME')}</Header>
            </Link>
          ) :
          (
            <Form onSubmit={this.handleSubmit}>
              <Input
                name="search"
                type="text"
                className="search"
                value={this.state.search}
                onChange={this.setSearch}
                placeholder="Search..."
                autoFocus
                icon="search"
              />
            </Form>
          )
        }
            </Menu.Menu>
            <Menu.Menu position="right">
              {searchVisible === false ?
                <Icon name="search" onClick={this.openSearch} />
            : null }
              <Icon.Group>
                <Link to="/cart" className="cart-link">
                  <Icon name="cart" size="large" className="shop-icon" color="black" />
                  {_.isEmpty(this.props.cart) ? null : (
                    <Label
                      color="orange"
                      size="mini"
                      floating
                      circular
                      content={this.getQuantity()}
                      className="cart-counter"
                    />
                  )}
                </Link>
              </Icon.Group>
            </Menu.Menu>
          </Menu>

          <Divider fitted />
          {this.state.toSearchPage !== false && searchVisible ? <Redirect to={`/search/${this.state.toSearchPage}`} /> : null}
        </Segment>
      </Container>
    );
  }
}
Bar.propTypes = {
  openMenu: PropTypes.func.isRequired,
  openSearch: PropTypes.func.isRequired,
  closeSearch: PropTypes.func.isRequired,
  searchVisible: PropTypes.bool.isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({
    quantity: PropTypes.number.isRequired,
  })).isRequired,
};


const mapStateToProps = state => ({
  cart: getCart(state.cart),
  searchVisible: isSearchVisible(state.navbar),
});


export default connect(mapStateToProps, { openMenu, openSearch, closeSearch })(Bar);
