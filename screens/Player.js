import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Video} from 'expo';
import {MaterialIcons, Octicons} from '@expo/vector-icons';
import {Badge, Block, Card, Text} from '../components';

export default class Player extends React.Component {
    state = {
        mute: false,
        shouldPlay: true,
    };

    handlePlayAndPause = () => {
        this.setState((prevState) => ({
            shouldPlay: !prevState.shouldPlay
        }));
    };

    handleVolume = () => {
        this.setState(prevState => ({
            mute: !prevState.mute,
        }));
    };

    render() {
        const {width} = Dimensions.get('window');

        return (
            <Block style={styles.container}>
                <Block>
                    <Video
                        source={{uri: 'http://stream.jeem.tv/geo/geotezz/playlist.m3u8'}}
                        shouldPlay={this.state.shouldPlay}
                        resizeMode="cover"
                        style={{width, height: 300}}
                        isMuted={this.state.mute}
                    />
                    <Block flex={false} row center space="between"  style={styles.controlBar}>
                        <MaterialIcons
                            name={this.state.mute ? "volume-mute" : "volume-up"}
                            size={45}
                            color="white"
                            onPress={this.handleVolume}
                        />
                        <MaterialIcons
                            name={this.state.shouldPlay ? "pause" : "play-arrow"}
                            size={45}
                            color="white"
                            onPress={this.handlePlayAndPause}
                        />
                    </Block>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlBar: {
        flex: 0,
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    }
});
