import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SignIn from './pages/SignIn/index';
import Deliveries from './pages/Deliveries/index';
import Perfil from './pages/Perfil/index';
import DeliveriesDetail from './pages/DeliveriesDetail/Details';
import ReportProblem from './pages/DeliveriesDetail/ReportProblem';
import VisualizeProblem from './pages/DeliveriesDetail/VisualizeProblem';

const stack = {
    screen: createStackNavigator(
        {
            Dashboard: {
                screen: Deliveries,
                navigationOptions: () => ({
                    headerShown: false,
                }),
            },
            Detail: {
                screen: DeliveriesDetail,
                navigationOptions: () => ({
                    headerShown: true,
                }),
            },
            Report: {
                screen: ReportProblem,
                navigationOptions: () => ({
                    headerShown: true,
                }),
            },
            ViewProblems: {
                screen: VisualizeProblem,
                navigationOptions: () => ({
                    headerShown: true,
                }),
            },
        },
        {
            defaultNavigationOptions: {
                headerTransparent: true,
                headerTintColor: '#FFF',
                headerLeftContainerStyle: {
                    marginLeft: 10,
                },
            },
        }
    ),
    navigationOptions: {
        tabBarVisible: true,
        tabBarLabel: 'Encomendas',
        tabBarIcon: ({focused}) => (
            <FontAwesome5
                name="box"
                size={20}
                color={focused ? '#7159c1' : 'rgb(179, 179, 179)'}
                solid
            />
        ),
    },
};

export default (isSigned = false) =>
    createAppContainer(
        createSwitchNavigator(
            {
                Sign: createSwitchNavigator({SignIn}),
                App: createBottomTabNavigator(
                    {
                        new: stack,
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
