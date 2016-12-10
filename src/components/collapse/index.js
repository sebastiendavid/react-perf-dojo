import React, { PureComponent, PropTypes } from 'react'

class Checkbox extends PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool,
    extraClassNames: PropTypes.array,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    collapsed: true,
    extraClassNames: [],
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(event) {
    const { onClick, collapsed } = this.props
    if (onClick) {
      onClick(!collapsed, event)
    }
  }

  render() {
    const { collapsed, extraClassNames } = this.props
    const classNames = ['mdi', collapsed ? 'mdi-chevron-right' : 'mdi-chevron-down']
    return (
      <i className={classNames.concat(extraClassNames).join(' ')} />
    )
  }
}

export default Checkbox
