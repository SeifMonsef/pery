import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Loader, Container } from 'semantic-ui-react';
import _ from 'lodash';

import { fetchCategories } from './actions';
import { getCategories, getCategoriesFetching, categoryPropType, getCategoriesHasMore } from './reducer';
import CategoriesList from './CategoriesList';
import { closeSearch } from '../../components/Bar/actions';
import { isSearchVisible } from '../../components/Bar/reducer';


class Categories extends Component {
  constructor(props) {
    super(props);
    this.loadCategories = this.loadCategories.bind(this);
  }

  componentDidMount() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }
    this.readCategories(1);
  }

  loadCategories() {
    if (this.props.hasMore) {
      // 20 is the default per_page number used for paginating categories
      const nextPage = Math.round(this.props.categories.length / 20) + 1;
      this.readCategories(nextPage);
    }
  }

  readCategories(page) {
    const { dispatch } = this.props;
    dispatch(fetchCategories({ page, per_page: 20, hide_empty: true }));
  }

  render() {
    // hasMore must be added here if InfiniteScroll is used
    const { loading, categories } = this.props;

    if (loading === 1 && categories.length === 0) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    if (categories.length === 0) {
      return (
        <Container>
          <p>No categories found.</p>
        </Container>
      );
    }

    const items = _.orderBy(categories, ['name'], ['asc']);

    return (
      <div>
        <Header textAlign="center">Categories</Header>
        <CategoriesList categories={items} />
      </div>
    );
  }
}

Categories.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(categoryPropType).isRequired,
  hasMore: PropTypes.bool.isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getCategoriesFetching(state.categories),
  categories: getCategories(state.categories),
  hasMore: getCategoriesHasMore(state.categories),
  searchVisible: isSearchVisible(state.navbar),

});

function mapDispatchToProps(dispatch) {
  return Object.assign(
    { dispatch },
    bindActionCreators({ fetchCategories, closeSearch }, dispatch),
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Categories);
