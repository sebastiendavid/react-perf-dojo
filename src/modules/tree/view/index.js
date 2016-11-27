import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './index.css';
import Tree from './tree';
import { fillTree } from '../actions';
import { getTotal } from '../reducer';

const mapStateToProps = (state) => ({
  total: getTotal(state)
});

const mapDispatchToProps = {
  fillTree
};

class TreeView extends Component {
  static propTypes = {
    fillTree: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentDidMount() {
    this.props.fillTree();
  }

  render() {
    const { total } = this.props;
    console.debug('render TreeView');
    return (
      <section className='Section TreeView'>
        <header className='TreeView__header'>
          <h2 className='TreeView__title'>
            <i className="mdi mdi-file-tree"></i>
            <span className='TreeView__titleLabel'>Tree</span>
          </h2>
          <span className='TreeView__total'>{total} items</span>
          <button className='TreeView__refresh' onClick={this.props.fillTree}>
            <i className='mdi mdi-refresh'></i>
            <span>Refresh</span>
          </button>
        </header>
        <div className='TreeView__wrapper'>
          <Tree />
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeView);
