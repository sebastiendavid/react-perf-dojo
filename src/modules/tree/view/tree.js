import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import './tree.css';
import { selectTree } from '../reducer';
import { selectItemTree } from '../actions';
import TreeRow from './tree-row';

const mapStateToProps = (state) => ({
  tree: selectTree(state)
});

const mapDispatchToProps = {
  select: selectItemTree
};

class Tree extends PureComponent {
  static propTypes = {
    tree: ImmutablePropTypes.list.isRequired,
    select: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(path, selected) {
    this.props.select(path, selected);
  }

  render() {
    const { tree } = this.props;
    console.debug('render Tree');
    return (
      <ul className='Tree'>
        {tree.map(item => (
          <TreeRow
            key={item.get('id')}
            id={item.get('id')}
            label={item.get('label')}
            children={item.get('children')}
            level={item.get('level')}
            path={item.get('path')}
            selected={item.get('selected')}
            onSelect={this.onSelect}
          />
        ))}
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
