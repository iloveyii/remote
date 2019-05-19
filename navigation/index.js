import React from 'react';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import { Image } from 'react-native';

import Welcome from '../screens/Welcome';
import Tv from '../screens/Tv';
import {theme } from '../constants';

const screens = createStackNavigator({
        Welcome,
        Tv
    }, {
    defaultNavigationOptions: {
        headerStyle: {
            height: theme.sizes.base * 4,
            backgroundColor: theme.colors.white,
            borderBottomColor: 'transparent',
            elevation: 0
        },
        headerBackImage: <Image source={require('../assets/icons/back.png')} />,
        headerBackTitle: null,
        headerLeftContainerStyle: {
            alignItems: 'center',
            marginLeft: 16,
            paddingRight: theme.sizes.base,
        },
        headerRightContainerStyle: {}
    }
});

export default createAppContainer(screens);
