import React from 'react';
import {Badge, Block, Card, Text} from '../components';
import {Animated, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {mocks, theme} from '../constants';
import Player from '../components/Player';
import Icon from "./Welcome";
import {MaterialIcons} from '@expo/vector-icons'

const {width, height} = Dimensions.get('window');

class Tv extends React.Component {

    scrollX = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = {
            channels: [],
            currentUrl: 'http://67.231.248.131:1935/live/PTVnews/chunklist_w1281891626.m3u8',
            channelName: 'PTV News'
        };

        this.renderIllustrations = this.renderIllustrations.bind(this);
        this.setUrl = this.setUrl.bind(this);
    }

    setUrl(channel) {
        const cmdString = channel.cmd;
        const cmdArray = cmdString.split(' ');
        const currentUrl = cmdArray[1];
        console.log('Setting url', currentUrl);
        this.setState({currentUrl, channelName: channel.name});
    }


    renderIllustrations() {
        const {channels} = this.props;
        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={channels}
                extraDate={this.state}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({item}) => (
                    <TouchableOpacity
                        key={item.name}
                        onPress={() => this.setUrl(item)}
                    >
                        <Card center middle shadow style={styles.channel}>
                            <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                                {
                                    item.tags.includes('channels')
                                        ? <Image source={item.image} style={styles.channelImg}/>
                                        : <Icon name={item.icon} size={30} color="#900"/>
                                }

                            </Badge>
                            <Text medium height={20}>{item.name}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
                onScroll={
                    Animated.event([{
                        nativeEvent: {contentOffset: {x: this.scrollX}}
                    }])
                }
            >
            </FlatList>
        )
    }

    render() {
        const {currentUrl} = this.state;

        return (
            <Block>
                <Block flex={false} row center space="around" style={styles.header}>
                    <Text h1 center bold>
                        <Text h1 primary> {this.state.channelName}. </Text>
                        <Text h2 accent> Live.
                            <MaterialIcons
                                name="wifi"
                                size={20}
                                color= {theme.colors.accent}
                            />
                        </Text>
                    </Text>
                </Block>

                <Block center middle flex={true}>
                    <Player url={currentUrl}/>
                </Block>

                <Block center middle flex={0.4}>
                    {this.renderIllustrations()}
                </Block>

            </Block>
        )
    }
}

Tv.defaultProps = {
    channels: mocks.channels,
    controls: mocks.controls,
    tabs: mocks.tabs,
    illustrations: [
        {id: 1, source: require('../assets/images/illustration_1.png')},
        {id: 2, source: require('../assets/images/illustration_2.png')},
        {id: 3, source: require('../assets/images/illustration_3.png')},
    ],
};

export default Tv;

const styles = StyleSheet.create({
    container: {
        borderColor: theme.colors.gray2,
        borderWidth: StyleSheet.hairlineWidth,
    },
    header: {
        paddingBottom: theme.sizes.base * 1
    },
    tabs: {
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2,
    },
    tab: {
        marginRight: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base
    },
    active: {
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 3,
    },
    channels: {
        flexWrap: 'wrap',
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom: theme.sizes.base * 3.5,
    },
    channel: {
        // this should be dynamic based on screen width
        minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
        maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
        maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
        marginHorizontal: theme.sizes.base * 1,
    },
    channelImg: {
        height: theme.sizes.base * 3.2,
        width: theme.sizes.base * 3.2,
    },
    flatItem: {
        marginTop: theme.sizes.base * 3.2,
    }
});
