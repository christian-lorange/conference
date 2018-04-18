import React from 'react'

import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'

import Header from './header.jsx'
import ProjectInfo from '../../../package.json'

/**
 * Component to display device related information
 * using Device and Network information Cordova plugins
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const AboutPhone = React.createClass({

  render() {
    const labelColumnStyle = { width: '38%' }


    return (
      <div>
        <Header pageTitle='About the phone' />
          <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={labelColumnStyle}>Description</TableRowColumn>
                <TableRowColumn>{ProjectInfo.description}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={labelColumnStyle}>App Version</TableRowColumn>
                <TableRowColumn>{ProjectInfo.version}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={labelColumnStyle}>Author</TableRowColumn>
                <TableRowColumn>{ProjectInfo.author.name}</TableRowColumn>
              </TableRow>
              <TableRow onTouchTap={() => window.cordova.InAppBrowser.open(ProjectInfo.author.url)}>
                <TableRowColumn style={labelColumnStyle}>Author Website</TableRowColumn>
                <TableRowColumn style={{textDecoration: 'underline'}}>{ProjectInfo.author.url}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={labelColumnStyle}>Platform</TableRowColumn>
                <TableRowColumn>{window.device.platform}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={labelColumnStyle}>Version</TableRowColumn>
                <TableRowColumn>{window.device.version}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={labelColumnStyle}>UUID</TableRowColumn>
                <TableRowColumn>{window.device.uuid}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={labelColumnStyle}>Model</TableRowColumn>
                <TableRowColumn>{window.device.model}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={labelColumnStyle}>Connection</TableRowColumn>
                <TableRowColumn>{window.navigator.connection.type}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
      </div>
    )
  }
})

export default AboutPhone
