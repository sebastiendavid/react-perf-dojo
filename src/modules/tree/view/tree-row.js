import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import './tree-row.css';

class TreeRow extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: ImmutablePropTypes.list,
  };

  render() {
    const { id, label, children } = this.props;
    console.debug('render TreeRow');
    return (
      <li id={`tree-row-${id}`} className='TreeRow'>
        <div className='TreeRow__line'>
          <i className='mdi mdi-chevron-right TreeRow__icon'></i>
          <span className='TreeRow__label'>{label}</span>
        </div>
        {!!children && children.map(item => (
          <TreeRow
            key={item.get('id')}
            id={item.get('id')}
            label={item.get('label')}
            children={item.get('children')}
          />
        ))}
      </li>
    );
  }
}

export default TreeRow;
