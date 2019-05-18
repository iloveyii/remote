import React from 'react';
import {Badge, Block, Card, Text} from '../components';
import {Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {mocks, theme} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';


const {width} = Dimensions.get('window');

class Welcome extends React.Component {
    state = {
        active: 'Remote',
        channels: []
    };

    renderTab(tab) {
        const {active} = this.state;
        const isActive = active === tab;

        return (
            <TouchableOpacity
                key={`tab-${tab}`}
                style={[
                    styles.tab,
                    isActive ? styles.active : null
                ]}
                onPress={() => this.handleTab(tab)}
            >
                <Text size={16} medium gray={!isActive} secondary={isActive}>
                    {tab}
                </Text>
            </TouchableOpacity>
        )
    }

    handleTab(tab) {
        const {channels} = this.props;
        const filtered = channels.filter(
            channel => channel.tags.includes(tab.toLowerCase())
        );
        this.setState({channels: filtered, active: tab});
        console.log('Filtered', filtered);
    }

    componentDidMount() {
        this.handleTab('remote');
    }

    handleChannel(cmdString) {
        console.log(cmdString);

        fetch('http://luma.softhem.se:8030?cmdadd=' + cmdString)
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }

    render() {
        const {channels} = this.state;
        const tabs = ['Remote', 'Channels', 'Favourite'];

        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold>Welcome</Text>
                </Block>

                <Block flex={false} row style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Block>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{paddingVertical: theme.sizes.base * 2}}
                >
                    <Block flex={false} row space="between" style={styles.channels}>
                        {channels.map((channel, index) => (
                            <TouchableOpacity
                                key={channel.name}
                                onPress={() => this.handleChannel(channel.cmd)}
                            >
                                <Card center middle shadow style={styles.channel}>
                                    <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                                        {
                                            channel.tags.includes('channels')
                                            ? <Image source={channel.image} style={styles.channelImg}/>
                                            : <Icon name={channel.icon} size={30} color="#900" />
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
    channels: mocks.channels
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
    }
});
