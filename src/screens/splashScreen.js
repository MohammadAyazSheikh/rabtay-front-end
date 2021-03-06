import React, { Component, createRef } from 'react';
import {
    View, StyleSheet, StatusBar, Animated, Button
} from 'react-native';
import Svg, { G, Path, Rect } from "react-native-svg";
import { BackGroundColor } from '../utilities/colors';



const AnimatedPath = Animated.createAnimatedComponent(Path);

export default class Splash extends Component {

    constructor(props) {
        super(props);
        this.scaleAnim = new Animated.Value(0.8);
        this.strokeAnim = new Animated.Value(0);

        this.colorAnim = this.strokeAnim.interpolate({
            inputRange: [0, 50],
            outputRange: ['transparent', 'white'],
        });
        // this.scaleAnim = this.strokeAnim.interpolate({
        //     inputRange: [0, 7],
        //     outputRange: [0.8, 1]
        // });
        this.opacAnim = this.strokeAnim.interpolate({
            inputRange: [0, 7],
            outputRange: [0, 1],
            extrapolate: 'clamp'

        });

        this.PathRef1 = createRef();
        this.PathRef2 = createRef();
        this.PathRef3 = createRef();

    }


    componentDidMount() {
        this.strokeAnim.addListener((v) => {
            this.PathRef1.current
                .setNativeProps({
                    strokeDashoffset: v.value,
                });
        })

        this.colorAnim.addListener((v) => {
            this.PathRef1.current
                .setNativeProps({
                    fill: v.value
                });
        })

        this.opacAnim.addListener((v) => {
            this.PathRef3.current
                .setNativeProps({
                    opacity: v.value,
                });
        });

        Animated.sequence(
            [
                Animated.parallel(
                    [
                        Animated.timing(this.strokeAnim, {
                            toValue: 7,
                            duration: 1000,
                            useNativeDriver: false
                        }),
                        Animated.timing(this.scaleAnim, {
                            toValue: 1.05,
                            duration: 1000,
                            useNativeDriver: false
                        })
                    ]
                ),
                Animated.timing(this.scaleAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false
                })
            ]
        ).start(
            () => {
                setTimeout(() => {
                    this.props.navigation.navigate('Registration');
                }, 1500)
                console.log('ended')
            }
        );

    }

    componentWillUnmount() {
        this.strokeAnim.removeAllListeners();
        this.colorAnim.removeAllListeners();
        this.opacAnim.removeAllListeners();
    }
    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{
                    backgroundColor: this.colorAnim,
                    opacity: this.opacAnim,
                }} />
                <Animated.View
                    style={{ transform: [{ scale: this.scaleAnim },] }}
                >
                    <Svg width={223 + 25} height={101 + 25} viewBox={`-4.5 -6 ${223 + 10} ${101 + 12}`} fill="none" style={styles.Svg}>
                        <G>
                            <AnimatedPath
                                d={d}
                                fill="none"
                                stroke='black'
                                strokeWidth={4}
                                ref={this.PathRef3}
                                style={{
                                    translateX: 1,
                                    translateY: 1,
                                    opacity: 0
                                }}
                            />
                            <AnimatedPath
                                d={d}
                                fill="none"
                                stroke='white'
                                strokeWidth={2}
                                strokeDasharray='20 7'
                                ref={this.PathRef1}

                            />
                            <AnimatedPath
                                d={d}
                                fill="none"
                                stroke='white'
                                strokeWidth={2}
                                strokeDasharray='20 7'
                            />
                        </G>
                    </Svg>
                </Animated.View>
            </View>
        );
    }
}



export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: BackGroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },

    Svg: {
        // borderWidth: 1,
    }

});



const d = "M67.632 51.944C68.256 51.944 68.736 52.232 69.072 52.808C69.456 53.384 69.648 54.176 69.648 55.184C69.648 57.056 69.192 58.544 68.28 59.648C65.976 62.432 63.648 64.592 61.296 66.128C58.944 67.616 56.16 68.36 52.944 68.36C49.824 68.36 47.16 67.52 44.952 65.84C42.792 64.16 40.728 61.28 38.76 57.2C37.176 53.936 35.928 51.536 35.016 50C34.104 48.416 33.192 47.288 32.28 46.616C31.416 45.944 30.336 45.536 29.04 45.392C28.848 46.4 28.296 49.568 27.384 54.896C27 57.296 26.76 58.76 26.664 59.288C26.184 62.216 25.224 64.472 23.784 66.056C22.344 67.592 20.16 68.36 17.232 68.36C14.016 68.36 11.16 67.424 8.664 65.552C6.216 63.632 4.32 60.992 2.976 57.632C1.632 54.224 0.96 50.36 0.96 46.04C0.96 37.976 2.352 31.016 5.136 25.16C7.968 19.304 11.904 14.84 16.944 11.768C22.032 8.648 27.888 7.088 34.512 7.088C39.12 7.088 42.984 7.784 46.104 9.176C49.224 10.568 51.528 12.488 53.016 14.936C54.552 17.384 55.32 20.144 55.32 23.216C55.32 25.904 54.672 28.544 53.376 31.136C52.128 33.68 50.232 35.936 47.688 37.904C45.144 39.872 42.048 41.336 38.4 42.296C40.704 42.92 42.48 43.928 43.728 45.32C44.976 46.712 46.224 48.752 47.472 51.44C48.816 54.32 50.136 56.432 51.432 57.776C52.776 59.12 54.312 59.792 56.04 59.792C57.576 59.792 59.04 59.288 60.432 58.28C61.824 57.224 63.576 55.448 65.688 52.952C66.264 52.28 66.912 51.944 67.632 51.944ZM19.104 45.32C17.472 45.32 16.344 44.936 15.72 44.168C15.144 43.4 14.856 42.536 14.856 41.576C14.856 40.424 15.216 39.512 15.936 38.84C16.704 38.168 17.568 37.832 18.528 37.832H20.328C21.096 33.128 21.816 29.072 22.488 25.664C23.112 22.544 25.128 20.984 28.536 20.984C31.272 20.984 32.64 22.208 32.64 24.656C32.64 25.184 32.616 25.592 32.568 25.88L30.408 37.832C33 37.688 35.352 37.064 37.464 35.96C39.624 34.856 41.328 33.32 42.576 31.352C43.872 29.384 44.52 27.152 44.52 24.656C44.52 21.632 43.488 19.256 41.424 17.528C39.36 15.8 36.336 14.936 32.352 14.936C27.648 14.936 23.52 16.112 19.968 18.464C16.464 20.768 13.728 24.224 11.76 28.832C9.792 33.392 8.808 38.96 8.808 45.536C8.808 48.608 9.12 51.248 9.744 53.456C10.368 55.664 11.136 57.32 12.048 58.424C12.96 59.528 13.824 60.08 14.64 60.08C15.264 60.08 15.768 59.768 16.152 59.144C16.584 58.52 16.92 57.512 17.16 56.12L19.104 45.32ZM71.2573 68.36C68.2813 68.36 65.9053 67.28 64.1293 65.12C62.3533 62.96 61.4653 60.128 61.4653 56.624C61.4653 52.784 62.3533 49.16 64.1293 45.752C65.9053 42.296 68.2573 39.536 71.1853 37.472C74.1613 35.36 77.3053 34.304 80.6173 34.304C81.6733 34.304 82.3693 34.52 82.7053 34.952C83.0893 35.336 83.4013 36.056 83.6413 37.112C84.6493 36.92 85.7053 36.824 86.8093 36.824C89.1613 36.824 90.3373 37.664 90.3373 39.344C90.3373 40.352 89.9773 42.752 89.2573 46.544C88.1533 52.064 87.6013 55.904 87.6013 58.064C87.6013 58.784 87.7693 59.36 88.1053 59.792C88.4893 60.224 88.9693 60.44 89.5453 60.44C90.4573 60.44 91.5613 59.864 92.8573 58.712C94.1533 57.512 95.9053 55.592 98.1133 52.952C98.6893 52.28 99.3373 51.944 100.057 51.944C100.681 51.944 101.161 52.232 101.497 52.808C101.881 53.384 102.073 54.176 102.073 55.184C102.073 57.104 101.617 58.592 100.705 59.648C98.7373 62.096 96.6493 64.16 94.4413 65.84C92.2333 67.52 90.0973 68.36 88.0333 68.36C86.4493 68.36 84.9853 67.832 83.6413 66.776C82.3453 65.672 81.3613 64.184 80.6893 62.312C78.1933 66.344 75.0493 68.36 71.2573 68.36ZM73.8493 61.088C74.9053 61.088 75.9133 60.464 76.8733 59.216C77.8333 57.968 78.5293 56.312 78.9613 54.248L81.6253 41C79.6093 41.048 77.7373 41.816 76.0093 43.304C74.3293 44.744 72.9853 46.664 71.9773 49.064C70.9693 51.464 70.4653 54.008 70.4653 56.696C70.4653 58.184 70.7533 59.288 71.3293 60.008C71.9533 60.728 72.7933 61.088 73.8493 61.088ZM134.526 45.896C135.15 45.896 135.63 46.208 135.966 46.832C136.302 47.456 136.47 48.248 136.47 49.208C136.47 50.408 136.302 51.344 135.966 52.016C135.63 52.64 135.102 53.072 134.382 53.312C131.502 54.32 128.334 54.896 124.878 55.04C123.918 59.024 122.094 62.24 119.406 64.688C116.766 67.136 113.838 68.36 110.622 68.36C105.774 68.36 102.246 66.512 100.038 62.816C97.8296 59.12 96.7256 53.768 96.7256 46.76C96.7256 40.568 97.4936 33.848 99.0296 26.6C100.566 19.304 102.798 13.112 105.726 8.024C108.702 2.888 112.23 0.319996 116.31 0.319996C118.518 0.319996 120.294 1.28 121.638 3.2C122.982 5.072 123.654 7.52 123.654 10.544C123.654 14.48 122.91 18.392 121.422 22.28C119.934 26.168 117.462 30.248 114.006 34.52C117.222 34.76 119.838 36.104 121.854 38.552C123.87 40.952 125.07 43.928 125.454 47.48C127.71 47.336 130.398 46.856 133.518 46.04C133.806 45.944 134.142 45.896 134.526 45.896ZM114.654 7.448C113.694 7.448 112.638 8.888 111.486 11.768C110.382 14.6 109.35 18.464 108.39 23.36C107.43 28.256 106.71 33.608 106.23 39.416C109.398 33.608 111.918 28.496 113.79 24.08C115.71 19.616 116.67 15.656 116.67 12.2C116.67 10.664 116.478 9.488 116.094 8.672C115.758 7.856 115.278 7.448 114.654 7.448ZM110.91 60.728C112.398 60.728 113.718 60.104 114.87 58.856C116.022 57.608 116.79 55.808 117.174 53.456C115.686 52.448 114.534 51.128 113.718 49.496C112.95 47.864 112.566 46.136 112.566 44.312C112.566 43.64 112.662 42.728 112.854 41.576H112.638C110.67 41.576 109.014 42.56 107.67 44.528C106.374 46.448 105.726 49.04 105.726 52.304C105.726 55.04 106.23 57.128 107.238 58.568C108.294 60.008 109.518 60.728 110.91 60.728ZM164.193 51.944C164.817 51.944 165.297 52.232 165.633 52.808C166.017 53.384 166.209 54.176 166.209 55.184C166.209 57.104 165.753 58.592 164.841 59.648C162.777 62.192 160.521 64.28 158.073 65.912C155.625 67.544 152.817 68.36 149.649 68.36C139.857 68.36 134.961 61.472 134.961 47.696C134.961 45.584 135.033 43.448 135.177 41.288H132.369C130.929 41.288 129.945 41.024 129.417 40.496C128.937 39.968 128.697 39.128 128.697 37.976C128.697 35.288 129.777 33.944 131.937 33.944H136.041C136.857 28.664 138.105 23.84 139.785 19.472C141.465 15.104 143.481 11.624 145.833 9.032C148.233 6.44 150.801 5.144 153.537 5.144C155.553 5.144 157.137 6.032 158.289 7.808C159.441 9.584 160.017 11.816 160.017 14.504C160.017 21.944 156.897 28.424 150.657 33.944H158.721C159.489 33.944 160.041 34.112 160.377 34.448C160.713 34.784 160.881 35.408 160.881 36.32C160.881 39.632 158.169 41.288 152.745 41.288H143.961C143.865 43.688 143.817 45.56 143.817 46.904C143.817 51.896 144.393 55.4 145.545 57.416C146.745 59.432 148.617 60.44 151.161 60.44C153.225 60.44 155.049 59.816 156.633 58.568C158.217 57.32 160.089 55.448 162.249 52.952C162.825 52.28 163.473 51.944 164.193 51.944ZM151.593 12.056C150.873 12.056 150.057 12.968 149.145 14.792C148.281 16.568 147.441 19.064 146.625 22.28C145.857 25.448 145.209 28.976 144.681 32.864C147.513 30.416 149.625 27.68 151.017 24.656C152.457 21.584 153.177 18.8 153.177 16.304C153.177 13.472 152.649 12.056 151.593 12.056ZM169.203 68.36C166.227 68.36 163.851 67.28 162.075 65.12C160.299 62.96 159.411 60.128 159.411 56.624C159.411 52.784 160.299 49.16 162.075 45.752C163.851 42.296 166.203 39.536 169.131 37.472C172.107 35.36 175.251 34.304 178.563 34.304C179.619 34.304 180.315 34.52 180.651 34.952C181.035 35.336 181.347 36.056 181.587 37.112C182.595 36.92 183.651 36.824 184.755 36.824C187.107 36.824 188.283 37.664 188.283 39.344C188.283 40.352 187.923 42.752 187.203 46.544C186.099 52.064 185.547 55.904 185.547 58.064C185.547 58.784 185.715 59.36 186.051 59.792C186.435 60.224 186.915 60.44 187.491 60.44C188.403 60.44 189.507 59.864 190.803 58.712C192.099 57.512 193.851 55.592 196.059 52.952C196.635 52.28 197.283 51.944 198.003 51.944C198.627 51.944 199.107 52.232 199.443 52.808C199.827 53.384 200.019 54.176 200.019 55.184C200.019 57.104 199.563 58.592 198.651 59.648C196.683 62.096 194.595 64.16 192.387 65.84C190.179 67.52 188.043 68.36 185.979 68.36C184.395 68.36 182.931 67.832 181.587 66.776C180.291 65.672 179.307 64.184 178.635 62.312C176.139 66.344 172.995 68.36 169.203 68.36ZM171.795 61.088C172.851 61.088 173.859 60.464 174.819 59.216C175.779 57.968 176.475 56.312 176.907 54.248L179.571 41C177.555 41.048 175.683 41.816 173.955 43.304C172.275 44.744 170.931 46.664 169.923 49.064C168.915 51.464 168.411 54.008 168.411 56.696C168.411 58.184 168.699 59.288 169.275 60.008C169.899 60.728 170.739 61.088 171.795 61.088ZM219.367 34.448C220.471 34.448 221.239 34.592 221.671 34.88C222.103 35.168 222.319 35.648 222.319 36.32C222.319 37.472 221.695 41.576 220.447 48.632C219.343 55.4 218.695 59.408 218.503 60.656C216.727 72.992 214.279 82.76 211.159 89.96C208.039 97.16 203.887 100.76 198.703 100.76C196.255 100.76 194.263 99.992 192.727 98.456C191.191 96.968 190.423 95 190.423 92.552C190.423 90.296 190.927 87.992 191.935 85.64C192.991 83.288 194.911 80.576 197.695 77.504C200.527 74.48 204.511 71 209.647 67.064L209.863 65.408C210.199 63.632 210.583 61.088 211.015 57.776C210.055 61.232 208.711 63.872 206.983 65.696C205.255 67.472 203.431 68.36 201.511 68.36C199.351 68.36 197.575 67.376 196.183 65.408C194.839 63.392 194.167 60.896 194.167 57.92C194.167 54.32 194.407 51.032 194.887 48.056C195.367 45.032 196.159 41.84 197.263 38.48C197.743 37.04 198.415 36.008 199.279 35.384C200.143 34.76 201.511 34.448 203.383 34.448C204.439 34.448 205.159 34.616 205.543 34.952C205.975 35.288 206.191 35.792 206.191 36.464C206.191 36.848 205.927 38.144 205.399 40.352C204.919 42.128 204.535 43.736 204.247 45.176C203.863 47.144 203.527 49.04 203.239 50.864C202.951 52.64 202.807 54.104 202.807 55.256C202.807 57.08 203.311 57.992 204.319 57.992C205.039 57.992 205.927 57.272 206.983 55.832C208.087 54.392 209.239 52.208 210.439 49.28C211.687 46.352 212.887 42.752 214.039 38.48C214.423 37.04 214.999 36.008 215.767 35.384C216.583 34.76 217.783 34.448 219.367 34.448ZM199.495 93.776C200.695 93.776 202.039 92.384 203.527 89.6C205.015 86.816 206.503 82.184 207.991 75.704C204.295 78.824 201.607 81.656 199.927 84.2C198.295 86.792 197.479 89.048 197.479 90.968C197.479 91.784 197.623 92.456 197.911 92.984C198.247 93.512 198.775 93.776 199.495 93.776Z"

















































// ******************************************************************************************************************************************************



// import { widthToDp, heightToDp } from '../utilities/responsiveUtils';
// import React, { useEffect } from 'react';
// import {
//     StyleSheet, View, Text, Image,
// } from 'react-native';
// import { BackGroundColor } from '../utilities/colors';
// import * as Animatable from 'react-native-animatable';

// function Splash(props) {

//     useEffect(
//         () => {
//             setTimeout(() => {
//                 props.navigation.navigate('Registration');
//             }, 3000)
//         },
//         []
//     );
//     return (
//         <View
//             style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: BackGroundColor }}
//         >
//             <Animatable.View
//                 // animation="bounceIn"
//                 animation="bounce"
//                 delay={0}
//                 useNativeDriver={true}
//             >
//                 <Text style={
//                     {
//                         fontSize: widthToDp(20),
//                         color: '#FFF',
//                         fontFamily: 'Pacifico-Regular',
//                         fontFamily: 'Pacifico-Regular',
//                         textShadowOffset: { width: 1.5, height: 1 },
//                         textShadowRadius: 1,
//                         textShadowColor: 'black',
//                     }}
//                 >
//                     Rabtay
//                 </Text>
//             </Animatable.View>
//         </View>


//     );
// };


// export default Splash;



