import React from 'react';
import {Badge, Block, Card, Text} from '../components';
import {Animated, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {mocks, theme} from '../constants';
import Player from '../components/Player';
import Icon from "./Welcome";

const {width, height} = Dimensions.get('window');

class Tv extends React.Component {

    scrollX = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = {
            active: 'Remote',
            channels: [],
            currentChannels: [],
            currentUrl: ''
        };

        this.setActive = this.setActive.bind(this);
        this.renderIllustrations = this.renderIllustrations.bind(this);
        this.setUrl = this.setUrl.bind(this);
    }

    setActive(tab) {
        this.handleTab(tab);
    }

    setUrl(cmd) {

    }

    handleTab(tab) {
        const {channels, controls} = this.props;

        if (tab === 'TV') {

        }

        if (tab === 'Remote') {
            this.setState({currentChannels: controls, active: tab});
        }

        if (tab === 'Channels') {
            const filtered = channels.filter(
                channel => channel.tags.includes(tab.toLowerCase())
            );
            this.setState({currentChannels: filtered, active: tab});
        }

        if (tab === 'Favourite') {
            const filtered = channels.filter(
                channel => channel.tags.includes(tab.toLowerCase())
            );
            this.setState({currentChannels: filtered, active: tab});
        }
    }

    componentDidMount() {
        this.setActive('TV');
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
                        onPress={() => this.setUrl(item.cmd)}
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
        const currentUrl = 'http://67.231.248.131:1935/live/PTVnews/chunklist_w1281891626.m3u8';
        const {channels} = this.props;
        console.log(channels.length);

        return (
            <Block>
                <Block flex={false} row center space="around" style={styles.header}>
                    <Text h1 center bold>
                        Live.
                        <Text h1 primary> TV.</Text>
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
