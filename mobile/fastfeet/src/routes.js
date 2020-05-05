import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SignIn from './pages/SignIn/index';
import Deliveries from './pages/Deliveries/index';
import Perfil from './pages/Perfil/index';

export default (isSigned = false) =>
    createAppContainer(
        createSwitchNavigator(
            {
                Sign: createSwitchNavigator({SignIn}),
                App: createBottomTabNavigator(
                    {
                        Deliveries,
                        Perfil,
                    },
                    {
                        tabBarOptions: {
                            keyboardHidesTabBar: true,
                            activeTintColor: '#7159c1',
                            inactiveTintColor: 'rgb(179, 179, 179)',
                            style: {
                                backgroundColor: 'rgb(255, 255, 255)',
                            },
                        },
                    }
                ),
            },
            {
                initialRouteName: isSigned ? 'App' : 'Sign',
            }
        )
    );
