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

  getIconClass() {
    const { checked } = this.props;
    if (checked) return 'mdi-checkbox-marked'
    else if (checked === null) return 'mdi-checkbox-blank'
    else return 'mdi-checkbox-blank-outline'
  }

  render() {
    const { extraClassNames } = this.props
    const classNames = ['mdi', this.getIconClass()]
    return (
      <i
        className={classNames.concat(extraClassNames).join(' ')}
        onClick={this.onClick}
      />
    )
  }
}

export default Checkbox
