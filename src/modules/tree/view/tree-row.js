import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import './tree-row.css';

class TreeRow extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: ImmutablePropTypes.list,
    level: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { collapsed: true };
    this.onClick = this.onClick.bind(this);
  }

  hasChildren() {
    const { children } = this.props;
    return !!children && !!children.size;
  }

  onClick() {
    if (this.hasChildren()) {
      this.setState({ collapsed: !this.state.collapsed });
    }
  }

  render() {
    const { id, label, children, level } = this.props;
    const { collapsed } = this.state;
    console.debug('render TreeRow');
    const hasChildren = this.hasChildren();
    const chevron = {
      direction: collapsed ? 'right' : 'down',
      visible: hasChildren ? 'visible' : 'hidden',
    };
    return (
      <li id={`tree-row-${id}`} className={`TreeRow TreeRow--level${level}`}>
        <div className='TreeRow__line' onClick={this.onClick}>
          <i className={`mdi mdi-chevron-${chevron.direction} TreeRow__icon TreeRow__icon--${chevron.visible}`}></i>
          <span className='TreeRow__label'>{label}</span>
        </div>
        {!collapsed && hasChildren &&
          <ul style={{ marginLeft: '2rem' }}>
            {children.map(item => (
              <TreeRow
                key={item.get('id')}
                id={item.get('id')}
                label={item.get('label')}
                children={item.get('children')}
                level={item.get('level')}
              />
            ))}
          </ul>
        }
      </li>
    );
  }
}

export default TreeRow;
