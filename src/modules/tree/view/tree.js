import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import './tree.css';
import { getTree } from '../reducer';
import TreeRow from './tree-row';

const mapStateToProps = (state) => ({
  tree: getTree(state)
});

class Tree extends PureComponent {
  static propTypes = {
    tree: ImmutablePropTypes.list.isRequired
  };

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
          />
        ))}
      </ul>
    );
  }
}

export default connect(mapStateToProps)(Tree);
