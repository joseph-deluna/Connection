import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase'
import { Gravatar } from 'react-native-gravatar';
import ActionButton from '../../components/ActionButton';
import styles from './styles';

class Profile extends Component {
    static route = {
        navigationBar: {
            title: 'Profile',
            backgroundColor: '#33cccc',
            tintColor: 'white',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            studentId: ''
        };
    }

    componentDidMount() {
        let uid = firebase.auth().currentUser.uid;
        this.getRef().child('users').child(uid).once('value', (user) => {
            this.setState({
                email: user.val().email,
                name: user.val().name,
                studentId: user.val().studentId
            });
        });
    }

    getRef() {
        return firebaseApp.database().ref();
    }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        user = firebase.auth().currentUser;
        const { studentId } = this.state;

        return (
            <View style={styles.profileContainer}>
                <View style={styles.innerProfileContainer}>
                    <Gravatar options={{
                        email: user.email,
                        parameters: { "size": "200", "d": "mm" },
                        secure: true
                    }}
                        style={styles.roundedProfileImage} />
                    <Text style={styles.profileText}>Hi {user.displayName}!</Text>
                    <Text style={styles.profileText}>{user.email}</Text>
                    {studentId.length > 0 &&
                        <Text style={styles.profileText}> {studentId}</Text>
                    }
                    <Text style={styles.subProfileText}> To add or edit your image, log on to Gravatar! </Text>
                </View>

                <ActionButton onPress={() => this.signOutUser()} title="Logout" />
            </View>
        );
    };
};

export default Profile;

