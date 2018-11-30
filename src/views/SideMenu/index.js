import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, Icon, Button, Container } from 'semantic-ui-react';

import './styles.css';

const SideMenu = props => (
  <Sidebar
    as={Menu}
    borderless
    animation="overlay"
    width="wide"
    visible={props.isVisible}
    icon="labeled"
    vertical
    inverted
    color="black"
    className="side"
  >
    <Button icon basic onClick={props.closeMenu} floated="right" >
      <Icon name="window close" className="custom-close" size="big" />
    </Button>
    <Container >
      <Link to="/" onClick={props.closeMenu}>
        <Menu.Item name="home">
        Home
        </Menu.Item>
      </Link>
      <Link to="/categories" onClick={props.closeMenu}>
        <Menu.Item name="categories">
        Categories
        </Menu.Item>
      </Link>
      <Link to="/cart" onClick={props.closeMenu}>
        <Menu.Item name="ordering">
      Shopping Cart
        </Menu.Item>
      </Link>
    </Container>

  </Sidebar>
);

SideMenu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default SideMenu;
