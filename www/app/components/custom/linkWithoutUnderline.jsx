import React from 'react'
import { Link } from 'react-router'

/**
 * Link component without text decoration underline
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const LinkWithoutUnderline = React.createClass({

  propTypes: {
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.array
  },

  render() {

    return (
      <Link to={this.props.to} style={{ textDecoration: 'none' }}>
        {this.props.children}
      </Link>
    )
  }

})

export default LinkWithoutUnderline
