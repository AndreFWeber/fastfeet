import React from 'react';
import {StatusBar, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, PageHeader} from './styles';

export default function Perfil() {
    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <PageHeader>
                <Text>Teste</Text>
            </PageHeader>
        </Container>
    );
}

Perfil.navigationOptions = {
    tabBarLabel: 'Meu Perfil',
    tabBarIcon: ({tintColor}) => (
        <Icon name="person" size={20} color={tintColor} />
    ),
};
