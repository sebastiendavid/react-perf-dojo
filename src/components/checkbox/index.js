import React, { PureComponent, PropTypes } from 'react'

class Checkbox extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool,
    extraClassNames: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    checked: false,
    extraClassNames: [],
    onChange() {}
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(event) {
    const { onChange, checked } = this.props
    onChange(!checked, event)
  }

  render() {
    const { checked, extraClassNames } = this.props
    const classNames = ['mdi', checked ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline']
    return (
      <i
        className={classNames.concat(extraClassNames).join(' ')}
        onClick={this.onClick}
      />
    )
  }
}

export default Checkbox
