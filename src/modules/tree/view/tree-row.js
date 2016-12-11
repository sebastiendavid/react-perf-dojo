import React, { PureComponent, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './tree-row.css'
import Collapse from '../../../components/collapse'
import Checkbox from '../../../components/checkbox'

class TreeRow extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: ImmutablePropTypes.list,
    level: PropTypes.number.isRequired,
    path: ImmutablePropTypes.list.isRequired,
    selected: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { collapsed: true }
    this.onRowClick = this.onRowClick.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
  }

  hasChildren() {
    const { children } = this.props
    return !!children && !!children.size
  }

  onRowClick(event) {
    if (this.hasChildren()) {
      this.setState({ collapsed: !this.state.collapsed })
    }
  }

  onSelectionChange(checked, event) {
    const { onSelect, path } = this.props
    event.stopPropagation()
    onSelect(path, checked)
  }

  render() {
    const { id, label, children, level, selected, onSelect } = this.props
    const { collapsed } = this.state
    console.debug('render TreeRow')
    const hasChildren = this.hasChildren()
    return (
      <li id={`tree-row-${id}`} className={`TreeRow TreeRow--level${level}`}>
        <div className='TreeRow__line' onClick={this.onRowClick}>
          <Collapse
            collapsed={collapsed}
            extraClassNames={['TreeRow__icon', `TreeRow__icon--${hasChildren ? 'visible' : 'hidden'}`]}
          />
          <Checkbox
            checked={selected}
            onChange={this.onSelectionChange}
          />
          <span className='TreeRow__label'>{label}</span>
        </div>
        {!collapsed && hasChildren &&
          <ul className='TreeRow__children'>
            {children.map(item => (
              <TreeRow
                key={item.get('id')}
                id={item.get('id')}
                label={item.get('label')}
                children={item.get('children')}
                level={item.get('level')}
                path={item.get('path')}
                selected={item.get('selected')}
                onSelect={onSelect}
              />
            ))}
          </ul>
        }
      </li>
    )
  }
}

export default TreeRow
