import React from 'react';
import {Badge, Block, Card, Text} from '../components';
import {Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {mocks, theme} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Player from '../components/Player';
import Tabs from '../components/Tabs';

const {width} = Dimensions.get('window');

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'Remote',
            channels: [],
            currentChannels: [],
            currentUrl: ''
        };

        this.setActive = this.setActive.bind(this);
    }

    setActive(tab) {
        this.handleTab(tab);
    }


    handleTab(tab) {
        const {channels, controls, navigation} = this.props;

        if (tab === 'TV') {
            this.setState({active: tab});
            navigation.navigate('Tv');
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
        this.setActive('Remote');
    }

    sendCommand(cmdString) {
        console.log(cmdString);
        const cmdArray = cmdString.split(' ');
        const currentUrl = cmdArray[1];

        fetch('http://luma.softhem.se:8030/server/index.php?cmdadd=' + cmdString)
            .then(response => console.log(response))
            .catch(err => console.log(err));

        this.setState({currentUrl});
    }

    showVideo() {
        const {currentUrl} = this.state;

        if (this.state.active == 'TV') {
            return (
                <Block>

                    <Block>
                        <Player url={currentUrl}/>
                    </Block>

                </Block>
            )
        }
    }

    render() {
        const {currentChannels} = this.state;

        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold>Live TV</Text>
                </Block>

                <Tabs active={this.state.active} setActive={this.setActive}/>


                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{paddingVertical: theme.sizes.base * 2}}
                >
                    <Block flex={false} row space="between" style={styles.channels}>
                        {currentChannels.map((channel) => (
                            <TouchableOpacity
                                key={channel.name}
                                onPress={() => this.sendCommand(channel.cmd)}
                            >
                                <Card center middle shadow style={styles.channel}>
                                    <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                                        {
                                            channel.tags.includes('channels')
                                                ? <Image source={channel.image} style={styles.channelImg}/>
                                                : <Icon name={channel.icon} size={30} color="#900"/>
                                        }

                                    </Badge>
                                    <Text medium height={20}>{channel.name}</Text>
                                    <Text gray caption>{channel.count} products</Text>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </Block>
                </ScrollView>

            </Block>

        )
    }
}

Welcome.defaultProps = {
    channels: mocks.channels,
    controls: mocks.controls,
    tabs: mocks.tabs
};

export default Welcome;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2
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
    },
    searchIcon: {
        position: 'absolute',
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base / 1.4,
    },
    channelImg: {
        height: theme.sizes.base * 3.2,
        width: theme.sizes.base * 3.2,
    },
    webView: {
        height: theme.sizes.base * 13.2,
        width: '100%',
    }
});
