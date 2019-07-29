import React, { Component } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import * as firebase from 'firebase'
import TextFieldInput from '../../components/TextFieldInput';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles.js';



class SignInForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userType: '',
            studentId: '',
            error: '',
            skills: '',
            talents: '',
            loading: false,
            modalVisible: false,
            dataSource: [],
        };
        this.itemsRef = this.getRef().child('users');
    }

    getRef() {
        return firebaseApp.database().ref();
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var users = [];
            snap.forEach((child) => {
                users.push({
                    name: child.val().name,
                    email: child.val().email,
                    userType: child.val().userType,
                    studentId: child.val().studentId,
                    skills: child.val().skills,
                    skills: child.val().talents,
                    _key: child.key
                });
            });
            this.setState({ dataSource: this.state.dataSource });
        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    onSignInPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: '', loading: false }); })
            .catch(() => {
                this.setState({ error: 'Authentication failed.', loading: false });
            });
    }

    onRegisterPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((success) => {
                this.setState({ error: '', loading: false })

                firebase.auth().currentUser.updateProfile({ displayName: this.state.name })
                var uid = firebase.auth().currentUser.uid;
                firebase.database().ref().child('users').child(uid).set({
                    name: this.state.name,
                    email: this.state.email.toLowerCase(),
                    userType: this.state.userType,
                    studentId: this.state.studentId,
                    skills: this.state.skills,
                    talents: this.state.talents,
                    userId: uid
                })

            })
            .catch((error) => {
                console.log(error)
                this.setState({ error: 'Authentication failed.', loading: false });
            });
    }

    renderButtonOrLoading() {
        if (this.state.loading) {
            return (
                <View style={{ paddingBottom: 15, alignSelf: 'center' }}>
                    <Text>LOADING...</Text>
                </View>
            );
        }
        return (
            <View style={{ paddingBottom: 15 }}>
                <Button onPress={this.onSignInPress.bind(this)} color='#ffa500' title="Log in" />
            </View>
        );
    }

    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }

    render() {

        return (
            <View style={styles.logInContainer} >
                <LinearGradient colors={['#70dbdb', '#33cccc', '#196666']} style={styles.gradient} >
                    <Text style={{ textAlign: 'center', fontSize: 40, color: 'white', paddingBottom: 15 }}>UConnect</Text>

                    <TextFieldInput
                        label='Email Address'
                        placeholder='Your Email Address'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        autoCorrect={false}
                    />
                    <TextFieldInput
                        label='Password'
                        autoCorrect={false}
                        placeholder='Your Password'
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    <View style={styles.buttonContainer}>
                        {this.renderButtonOrLoading()}
                        <Button onPress={() => this.openModal()} color='#ffa500' title="Register" />
                    </View>

                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}>
                        <LinearGradient colors={['#196666', '#33cccc', '#196666']} style={styles.gradient} >

                            <Text style={{ textAlign: 'center', fontSize: 25, color: 'white', paddingBottom: 15 }}>REGISTER</Text>

                            <TextFieldInput
                                label='Name'
                                autoCorrect={false}
                                placeholder='Your Name'
                                value={this.state.name}
                                onChangeText={name => this.setState({ name })}
                            />
                            <TextFieldInput
                                label='Email Address'
                                placeholder='Your Email Address'
                                value={this.state.email}
                                onChangeText={email => this.setState({ email })}
                                autoCorrect={false}
                            />
                            <TextFieldInput
                                label='Password'
                                autoCorrect={false}
                                placeholder='Your Password'
                                secureTextEntry
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                            />
                            <TextFieldInput
                                label='User Type'
                                autoCorrect={false}
                                placeholder='Admin/Student'
                                value={this.state.userType}
                                onChangeText={userType => this.setState({ userType })}
                            />
                            {this.state.userType.toLowerCase() === 'student' && (
                                <TextFieldInput
                                    label='Student ID'
                                    autoCorrect={false}
                                    placeholder='Your Student ID'
                                    value={this.state.studentId}
                                    onChangeText={studentId => this.setState({ studentId })}
                                />
                            )
                            }
                            <TextFieldInput
                                label='Skills'
                                autoCorrect={false}
                                placeholder='Add Skills'
                                value={this.state.skills}
                                onChangeText={skills => this.setState({ skills })}
                            />
                            <TextFieldInput
                                label='Talents'
                                autoCorrect={false}
                                placeholder='Add Talents'
                                value={this.state.talents}
                                onChangeText={talents => this.setState({ talents })}
                            />

                            <View style={styles.buttonContainer}>
                                <View style={{ paddingBottom: 15 }}>
                                    <Button onPress={() => this.closeModal()} color="#ffa500" title="Cancel" />
                                </View>
                                <View style={{ paddingBottom: 15 }}>
                                    <Button onPress={this.onRegisterPress.bind(this)} color="#ffa500" title="Submit" />
                                </View>
                            </View>
                        </LinearGradient>
                    </Modal>

                </LinearGradient>
            </View>
        );
    }
}

export default SignInForm;