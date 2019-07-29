import React, { Component } from 'react';
import { ReactNative, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-ionicons';
import styles from '../styles.js';


export default class EventItem extends Component {
  render() {
    event = this.props.event;
    user = firebaseApp.auth().currentUser.displayName;
    userEmail = firebaseApp.auth().currentUser.email;
    rsvp = event.rsvpby ? Object.values(event.rsvpby).map((project) => {
      return project.rsvpby;
    }) : [];
    function isInArray(rsvp, userEmail) {
      return rsvp.indexOf(userEmail.toLowerCase()) > -1;
    }
    inArray = isInArray(rsvp, userEmail);

    return (
      <TouchableHighlight >
        <View style={styles.eventsli}>
          <View style={{ flex: 4 }}>
            <Text style={styles.eventsliText}>{event.title}</Text>
            {Boolean(event.desc) && <Text style={styles.eventDescText}>{event.desc}</Text>}
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 4 }}>
              {Boolean(event.date) && <Text style={styles.eventDateTime}>Date:  {event.date}</Text>}
              {Boolean(event.time) && <Text style={styles.eventDateTime}>Time:  {event.time}</Text>}
            </View>
            {Boolean(event.location) && <Text style={styles.eventDateTime}>Location:  {event.location}</Text>}
            {Boolean(event.invitedby) && <Text style={styles.eventDateTime}>Invited by:  {event.invitedby}</Text>}
          </View>

          <View style={{ flexDirection: 'row', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#1f7a7a', fontSize: 15, paddingHorizontal: 8 }}> {rsvp && rsvp.length > 0 ? rsvp.length : ''} </Text>
            {inArray ?
              <Icon onPress={this.props.onUnRsvp} name='checkmark' color="#00e600" style={{ padding: 5 }} /> :
              <Icon onPress={this.props.onRsvp} name='send' color="#1f7a7a" style={{ padding: 5 }} />
            }
            {user === event.invitedby ?
              <Icon onPress={this.props.onPress} name='close' style={{ padding: 5 }} /> : null}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
