import React from 'react'
import { hashHistory } from 'react-router'

import LinkWithoutUnderline from './custom/linkWithoutUnderline.jsx'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Divider from 'material-ui/Divider'

/**
 * Header component
 * Right icon is optional and can be passed as props
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Header = React.createClass({

  getInitialState() {
    return {
      isMenuOpen: false
    }
  },

  propTypes: {
    pageTitle: React.PropTypes.string.isRequired,
    hasReturnButton: React.PropTypes.bool,
    iconElementRight: React.PropTypes.element,
    onRightIconButtonTouchTap: React.PropTypes.func
  },

  render() {
    const appBar =
    <div>
      <AppBar
        title={this.props.pageTitle}
        onLeftIconButtonTouchTap={this._toggleMenu}
        iconElementRight={this.props.iconElementRight}
        onRightIconButtonTouchTap={this.props.onRightIconButtonTouchTap} />
      <Drawer open={this.state.isMenuOpen} onRequestChange={this._handleDrawerRequestChange}>
        <LinkWithoutUnderline to="/">
          <MenuItem onTouchTap={this._closeMenu}>Conference</MenuItem>
          <Divider />
        </LinkWithoutUnderline>
        <LinkWithoutUnderline to="/sessions">
          <MenuItem onTouchTap={this._closeMenu}>Sessions</MenuItem>
          <Divider />
        </LinkWithoutUnderline>
        <LinkWithoutUnderline to="/speakers">
          <MenuItem onTouchTap={this._closeMenu}>Speakers</MenuItem>
          <Divider />
        </LinkWithoutUnderline>
        <LinkWithoutUnderline to="/schedule">
          <MenuItem onTouchTap={this._closeMenu}>Schedule</MenuItem>
          <Divider />
        </LinkWithoutUnderline>
        <LinkWithoutUnderline to="/aboutPhone">
          <MenuItem onTouchTap={this._closeMenu}>About the phone</MenuItem>
          <Divider />
        </LinkWithoutUnderline>
      </Drawer>
    </div>

    const appBarWithReturn =
      <AppBar
          title={this.props.pageTitle}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={hashHistory.goBack}
          iconElementRight={this.props.iconElementRight}
          onRightIconButtonTouchTap={this.props.onRightIconButtonTouchTap}
        />

    return this.props.hasReturnButton ? appBarWithReturn : appBar
  },

  //////////////////////
  // PRIVATE          //
  //////////////////////

  _toggleMenu() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    })
  },

  _closeMenu() {
    this.setState({
      isMenuOpen: false
    })
  },

  _handleDrawerRequestChange(open) {
    this.setState({
      isMenuOpen: open
    })
  }
})

export default Header
