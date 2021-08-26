import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { BackGroundColor } from '../utilities/colors';
import { heightToDp, widthToDp } from '../utilities/responsiveUtils';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';







const swipeFromRightOpen = () => {
    // alert('Swipe from right');
};
const rightSwipeActions = () => {
    return (
        <View style={styles.BtnSwipeView}   >
            <TouchableOpacity style={[styles.btnSwipe, { backgroundColor: 'tomato' }]}>
                <Icon name='user-unfollow' size={25} color='#FFF' />
                <Text style={[styles.txtBtn,]}>
                    Ignore
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnSwipe, { backgroundColor: BackGroundColor }]}>
                <Icon name='user-follow' size={25} color='#FFF' />
                <Text style={styles.txtBtn}>
                    Follow
                </Text>
            </TouchableOpacity>
        </View>
    );
};

class SingleNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
        return (
            <View style={styles.mainView}>
                <Swipeable
                    renderRightActions={rightSwipeActions}
                    onSwipeableRightOpen={swipeFromRightOpen}

                >
                    <View style={styles.NotificationView}>
                        <View style={styles.infoView}>
                            <View style={styles.imageView}>
                                <Image source={this.props.image} style={styles.imageStyle} />
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.txtName}>{this.props.uName}
                                    <Text style={styles.txtDesc}> sends you follow request</Text>
                                </Text>
                                <Text style={styles.txtTime}>2 hourse ago</Text>
                            </View>
                        </View>
                    </View>
                </Swipeable>
            </View>
        )
    }
}

export default SingleNotification;

const styles = StyleSheet.create({

    mainView: {
        elevation: 10,
        width: widthToDp(100),
        height: heightToDp(14),
        marginVertical:5,
    },
    NotificationView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        width: widthToDp(100),
        height: heightToDp(14),
    },

    infoView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5
    },
    imageView: {
        width: widthToDp(26),
        height: widthToDp(26),
        borderRadius: widthToDp(25),
        borderWidth: 2,
        borderColor: BackGroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BackGroundColor
    },
    imageStyle: {
        width: widthToDp(25),
        height: widthToDp(25),
        borderRadius: widthToDp(25),
        resizeMode: 'cover'
    },
    textView: {
        paddingLeft: 10,
        flex: 1,
    },
    txtName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    txtDesc: {
        fontSize: 14,
        fontWeight: 'normal'
    },
    txtTime: {
        color: 'grey'
    },
    BtnSwipeView: {
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        width: '55%',
        height: '100%',
        flexDirection: 'row',
    },
    btnSwipe: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '100%'
    },
    txtBtn: {
        color: '#FFF',
        fontWeight: 'bold'
    }

});

