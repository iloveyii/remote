import React from 'react';
import {Block, Text} from '../components';
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import {mocks, theme} from "../constants";
import Welcome from "../screens/Welcome";

const {width} = Dimensions.get('window');

class Tabs extends React.Component {

    renderTab(tab) {
        const {active} = this.props;
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
      const { setActive } = this.props;
      setActive(tab);
    }

    render() {

        const { tabs } = this.props;

        return (

            <Block flex={false} row style={styles.tabs}>
                {tabs.map(tab => this.renderTab(tab))}
            </Block>
        )

    }
}

Tabs.defaultProps = {
    tabs: mocks.tabs
};

export default Tabs;
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
