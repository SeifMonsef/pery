import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Segment, Grid, GridColumn } from 'semantic-ui-react';
import React, { Component } from 'react';
import './CategoryCard.css';
import './styles.css';

class CategoryCard extends Component {
  render() {
    return (
      <div className="home-hero">
        <div style={{ background: _.isEmpty(this.props.src) ? 'black' : 'url(' + this.props.src + ')', backgroundPosition: '0em -2em', backgroundSize: 'cover' }} className="p1" >
          <Segment className="seg1" >
            <Grid columns={2}>
              <Grid.Column>
                <Link to={'/category/' + this.props.id}>
                  <p className="custom-props">{this.props.name}</p>
                </Link>
              </Grid.Column>
              <GridColumn textAlign="right">
                <Link to={'/category/' + this.props.id}>
                  <p className="custom-props">View Product</p>
                </Link>
              </GridColumn>
            </Grid>
          </Segment>
        </div>
      </div>
    );
  }
}

CategoryCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};


export default CategoryCard;
