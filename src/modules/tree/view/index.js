import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './index.css';
import Tree from './tree';
import { fillTree } from '../actions';

const mapDispatchToProps = {
  fillTree
};

class TreeView extends Component {
  static propTypes = {
    fillTree: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fillTree();
  }

  render() {
    console.debug('render TreeView');
    return (
      <section className='Section TreeView'>
        <h2 className='TreeView__title'>
          <i className="mdi mdi-file-tree"></i>
          <span className='TreeView__titleLabel'>Tree</span>
          <button onClick={this.props.fillTree}>Reset tree</button>
        </h2>
        <div className='TreeView__wrapper'>
          <Tree />
        </div>
      </section>
    );
  }
}

export default connect(null, mapDispatchToProps)(TreeView);
