import React from 'react'
import renderHTML from 'react-render-html'

import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card'
import {GridList, GridTile} from 'material-ui/GridList'
import { List, ListItem } from 'material-ui/List'
import Toggle from 'material-ui/Toggle'
import Snackbar from 'material-ui/Snackbar'

import LinkWithoutUnderline from '../custom/linkWithoutUnderline.jsx'
import Header from '../header.jsx'
import SocialIcons from './socialIcons.jsx'

/**
 * Component to view a speaker
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Speaker = React.createClass({

  getInitialState() {
    return {
      openSuccessAddContactSnackbar: false,
      openFailAddContactSnackbar: false,
      openSuccessRemoveContactSnackbar: false,
      openFailRemoveContactSnackbar: false,
      isContactToggled: false
    }
  },

  propTypes: {
    speaker: React.PropTypes.object.isRequired,
    speakerId: React.PropTypes.string.isRequired,
    fetchSpeaker: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    // load the session
    this.props.fetchSpeaker(this.props.speakerId)
  },

  componentWillReceiveProps(newProps) {
    this._checkIfContactAlreadyExists(newProps.speaker.id)
  },


  render() {

    const snackbarAutoHideDuration = 4000
    const rightArrow = <i className="fa fa-angle-right" aria-hidden="true" />

    const sessions = this.props.speaker.sessions ? this.props.speaker.sessions.map(session => {
      return (
        <LinkWithoutUnderline key={session.id} to={`/sessions/${session.id}`}>
          <ListItem
            value={session.id}
            primaryText={session.title}
            rightIcon={rightArrow}
          />
        </LinkWithoutUnderline>
      )
    }) : undefined

    return (
      <div>
        <Header pageTitle='Speaker' hasReturnButton={true} />
        <Card>
          <CardHeader
            title={`${this.props.speaker.firstname} ${this.props.speaker.lastname}`}
          />
          <CardText>
            <Toggle style={{marginBottom: '10px'}}
              label='Add to my contacts'
              onToggle={this._handleContactToggle}
              toggled={this.state.isContactToggled}
            />
            <GridList cellHeight={500}>
              <GridTile key='speaker.about'>
                {renderHTML(`<div>${this.props.speaker.about}</div>`)}
                { this.props.speaker.socials ?
                    <SocialIcons socialIcons={this.props.speaker.socials} />
                    : undefined
                }
              </GridTile>
              <GridTile key='speaker.image'>
                <img src={`data/img/speakers/${this.props.speaker.image}`} alt={`Image ${this.props.speaker.id}`}/>
              </GridTile>
            </GridList>
          </CardText>
        </Card>
        <Card>
          <CardTitle>His sessions</CardTitle>
          <CardText>
            <List>
              {sessions}
            </List>
          </CardText>
        </Card>
        <Snackbar
          open={this.state.openSuccessAddContactSnackbar}
          message='Contact added in your device'
          autoHideDuration={snackbarAutoHideDuration}
        />
        <Snackbar
          open={this.state.openFailAddContactSnackbar}
          message='Sorry, we were unable to add this contact'
          autoHideDuration={snackbarAutoHideDuration}
        />
        <Snackbar
          open={this.state.openSuccessRemoveContactSnackbar}
          message='Contact removed from your device'
          autoHideDuration={snackbarAutoHideDuration}
        />
        <Snackbar
          open={this.state.openFailRemoveContactSnackbar}
          message='Sorry, we were unable to remove this contact'
          autoHideDuration={snackbarAutoHideDuration}
        />
      </div>
    )
  },

  //////////////////////
  // PRIVATE          //
  //////////////////////

  _handleContactToggle(e, isToggled) {
    if (isToggled) {
      // add the contact
      const contact = {
        nickname: this.props.speaker.id,
        displayName: `${this.props.speaker.firstname} ${this.props.speaker.lastname}`,
        name: {
          givenName: this.props.speaker.firstname,
          familyName: this.props.speaker.lastname
        },
        note: this.props.speaker.about,
        organizations: [{
          name: this.props.speaker.company
        }]
      }
      contact.urls = this.props.speaker.socials.map(social => {
        return {
          type: social.class,
          value: social.link
        }
      })
      const onSuccessSave = () => this.setState({openSuccessAddContactSnackbar: true, isContactToggled: true})
      const onFailSave = () => this.setState({openFailAddContactSnackbar: true, isContactToggled: false})
      window.navigator.contacts.create(contact).save(onSuccessSave, onFailSave)
    } else {
      const findOptions = {}
      findOptions.filter = this.props.speaker.id
      findOptions.desiredFields = [window.navigator.contacts.fieldType.id]
      const findFields = [window.navigator.contacts.fieldType.nickname]
      const onSuccessFindContact = contacts => {
        const contact = contacts[0]
        if (contact) {
          contact.remove()
          this.setState({openSuccessRemoveContactSnackbar: true, isContactToggled: false})
        } else {
          this.setState({openFailRemoveContactSnackbar: true, isContactToggled: true})
        }
      }
      const onFailFindContact = () => {
        this.setState({openFailRemoveContactSnackbar: true, isContactToggled: true})
      }
      window.navigator.contacts.find(findFields, onSuccessFindContact,
        onFailFindContact, findOptions)
    }
  },

  _checkIfContactAlreadyExists(speakerId) {
    const findOptions = {}
    findOptions.filter = speakerId
    findOptions.desiredFields = [window.navigator.contacts.fieldType.id]
    const findFields = [window.navigator.contacts.fieldType.nickname]
    const onSuccessFindContact = contacts => {
      const contact = contacts[0]
      this.setState({isContactToggled: !!contact})
    }
    const onFailFindContact = () => {
      this.setState({isContactToggled: false})
    }
    window.navigator.contacts.find(findFields, onSuccessFindContact,
      onFailFindContact, findOptions)
  }

})

export default Speaker
