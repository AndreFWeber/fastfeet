import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {signOut} from '../../store/modules/auth/actions';
import {
    Container,
    AvatarContainer,
    Avatar,
    NameAvatar,
    NameAvatarText,
    DeliveryPerson,
    Info,
    Value,
    LogoutButton,
} from './styles';

export default function Perfil() {
    const deliveryPerson = useSelector((state) => state.auth.deliveryPerson);
    const dispatch = useDispatch();

    const [rgb, setRgb] = useState(['255', '255', '255', '255', '255', '255']);

    function handleRGB() {
        if (!deliveryPerson.avatar) {
            // Sort random color to use as avatar
            const rgbs = [];
            for (let i = 0; i < 6; i++) {
                rgbs.push(Math.floor(Math.random() * 255) + 1);
            }
            setRgb(rgbs);
        }
    }
    useEffect(() => {
        handleRGB();
    }, [deliveryPerson]);

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <AvatarContainer>
                {deliveryPerson && deliveryPerson.avatar ? (
                    <Avatar
                        source={{
                            uri: deliveryPerson.avatar.url,
                        }}
                    />
                ) : (
                    <NameAvatar
                        r={rgb[0]}
                        g={rgb[1]}
                        b={rgb[2]}
                        onPress={handleRGB}>
                        <NameAvatarText r={rgb[3]} g={rgb[4]} b={rgb[5]}>
                            {deliveryPerson &&
                                deliveryPerson.name
                                    .split(' ')
                                    .map((n, i) => i < 2 && n[0])}
                        </NameAvatarText>
                    </NameAvatar>
                )}
            </AvatarContainer>
            <DeliveryPerson>
                <Info>Nome</Info>
                <Value>{deliveryPerson.name}</Value>
                <Info>Email</Info>
                <Value>{deliveryPerson.email}</Value>
                <Info>Data de cadastro</Info>
                <Value>{deliveryPerson.name}</Value>
            </DeliveryPerson>
            <LogoutButton onPress={handleSignOut}>Logout</LogoutButton>
        </Container>
    );
}

Perfil.navigationOptions = {
    tabBarLabel: 'Meu Perfil',
    tabBarIcon: ({tintColor}) => (
        <Icon name="user-circle" size={20} color={tintColor} solid />
    ),
};
