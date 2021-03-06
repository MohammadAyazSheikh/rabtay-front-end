import React, { Component, createRef } from 'react';
import { View, Text, StyleSheet, Image, Vibration, TouchableOpacity } from 'react-native';
import { BackGroundColor } from '../utilities/colors';
import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
import { OnVideoCallEnd } from '../redux/actions/onVideoCallActions';
import { GetVideoChatToken } from '../redux/actions/getVideoChatTokenActions';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
import { post } from '../utilities/data';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { baseUrl } from '../utilities/config';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { socket } from '../lib/socket';





const mapStateToProps = state => {
    return {
        user: state?.user?.user?.user,
        token: state?.user?.user?.token,
        roomName: state?.onVideoCall?.roomName,
        endCall: state?.onVideoCall?.endCall,
        contact: state?.onVideoCall?.contact
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        onVideoCallEnd: () => {
            dispatch(OnVideoCallEnd())
        },
        getVideoChatToken: (token, username) => {
            dispatch(GetVideoChatToken(token, username));
        },
    }
};




class IncomingCall extends Component {
    constructor(props) {
        super(props);

        this.ONE_SECOND_IN_MS = 1000;
        this.PATTERN = [1 * this.ONE_SECOND_IN_MS, 2 * this.ONE_SECOND_IN_MS, 1 * this.ONE_SECOND_IN_MS];

        this.circleAnim = createRef();
    }




    componentDidMount() {
        this.circleAnim.current.play();
        this.circleAnim.current.play(1, 320);
        Vibration.vibrate(this.PATTERN, true);
        this.props.getVideoChatToken(this.props.token, this.props.user.username);
    }
    componentWillUnmount() {
        Vibration.cancel();
    }
    componentDidUpdate() {
        if (this.props.endCall) {
            Vibration.cancel();
            this.props.navigation.goBack();
        }
    }
    render() {
        const imageUrl = this.props?.contact?.profileImage?.path;

        return (
            <View style={styles.container}>
                {
                    imageUrl ?
                        <Image source={{ uri: baseUrl + imageUrl }}
                            style={styles.backgroundImage} blurRadius={20} />
                        :
                        <Image source={require('../../assets/images/profile3.jpeg')}
                            style={styles.backgroundImage} blurRadius={20} />
                }

                <View style={styles.HeaderView}>
                    <View style={styles.profileImageView}>
                        <LottieView
                            style={styles.animationStyles}
                            resizeMode='cover'
                            // loop
                            // autoPlay
                            ref={this.circleAnim}
                            source={require('../utilities/animations/circleAnim.json')}
                        />
                        {
                            imageUrl ?
                                <Image source={{ uri: baseUrl + imageUrl }}
                                    style={styles.profileImageStyle} />
                                :
                                <Image source={require('../../assets/images/profile3.jpeg')}
                                    style={styles.profileImageStyle} />
                        }

                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.txtCallingStaus} >Calling</Text>
                        <Text style={styles.txtUname}> Ilyas Sheikh</Text>
                        <IconMat name='videocam' size={40} color='#FFF' />
                    </View>
                </View>
                <View style={styles.BtnView}>
                    <TouchableOpacity
                        onPress={() => {
                            Vibration.cancel();
                            this.props.onVideoCallEnd();
                            this.props.navigation.goBack();
                            socket.emit('videoCall', {
                                contactId: this.props.contact?._id,
                                userId: this.props.user._id,
                                startCall: false
                            });
                        }}
                    >
                        <Animatable.View animation='swing' iterationCount='infinite' style={[styles.BtnStyle, { backgroundColor: '#F15946' }]}>
                            <IconMat name='call-end' size={40} color='#FFF' />
                        </Animatable.View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            Vibration.cancel();
                            this.props.navigation.navigate('VideoCall', {
                                roomName: this.props.roomName
                            });
                        }}
                    >
                        <Animatable.View animation='swing' iterationCount='infinite' style={styles.BtnStyle}>
                            <IconFeather name='phone-call' size={40} color='#FFF' />
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(IncomingCall);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F1F5',
        justifyContent: 'center',
        alignItems: 'center'
    },

    backgroundImage: {
        width: '100%',
        height: '100%',
        ...StyleSheet.absoluteFill
    },

    HeaderView: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImageView: {
        width: widthToDp(42),
        height: widthToDp(42),
        borderRadius: widthToDp(21),
        // backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },

    animationStyles: {
        transform: [{ scale: 1.65 }]
    },
    profileImageStyle: {
        width: '90%',
        height: '90%',
        borderRadius: widthToDp(21),
        borderColor: BackGroundColor,
        borderWidth: 1
    },

    txtView: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtCallingStaus: {
        color: '#D6D6D6',
        fontSize: 20,
        marginBottom: 10
    },

    txtUname: {
        color: '#FFF',
        fontSize: 26
    },
    BtnView: {
        width: '100%',
        height: '30%',
        // backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    BtnStyle: {
        width: widthToDp(20),
        height: widthToDp(20),
        borderRadius: widthToDp(22),
        backgroundColor: BackGroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    }
})

