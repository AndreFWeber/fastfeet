import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {setLoader} from '../../store/modules/app/actions';
import {signOut} from '../../store/modules/auth/actions';
import PacksList from '../../components/PackList/List';
import {PackagesRequest} from '../../store/modules/packs/actions';

import {
    Container,
    PageHeader,
    AvatarContainer,
    Avatar,
    NameAvatar,
    NameAvatarText,
    Welcome,
    Name,
    HeaderContent,
    ExitButton,
    PageMenu,
    MenuTitle,
    MenuOptions,
    MenuOption,
    MenuOptionText,
} from './styles';

export default function Deliveries({navigation}) {
    const [menuOption, setMenuOption] = useState('undelivered');
    const [packs, setPacks] = useState([]);
    const [rgb, setRgb] = useState(['255', '255', '255', '255', '255', '255']);
    const deliveryPerson = useSelector((state) => state.auth.deliveryPerson);
    const deliveryPacks = useSelector((state) => state.packs.deliveryPacks);
    const dispatch = useDispatch();

    function handleSignOut() {
        dispatch(signOut());
    }

    useEffect(() => {
        if (!deliveryPerson.avatar) {
            // Sort random color to use as avatar
            const rgbs = [];
            for (let i = 0; i < 6; i++) {
                rgbs.push(Math.floor(Math.random() * 255) + 1);
            }
            setRgb(rgbs);
        }
    }, [deliveryPerson]);

    useEffect(() => {
        setPacks(deliveryPacks);
    }, [deliveryPacks]);

    useEffect(() => {
        setPacks([]);
        dispatch(PackagesRequest(1, menuOption === 'delivered'));
    }, [menuOption]);

    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <PageHeader>
                <AvatarContainer>
                    {deliveryPerson && deliveryPerson.avatar ? (
                        <Avatar
                            source={{
                                uri: deliveryPerson.avatar.url,
                            }}
                        />
                    ) : (
                        <NameAvatar r={rgb[0]} g={rgb[1]} b={rgb[2]}>
                            <NameAvatarText r={rgb[3]} g={rgb[4]} b={rgb[5]}>
                                {deliveryPerson &&
                                    deliveryPerson.name
                                        .split(' ')
                                        .map((n, i) => i < 2 && n[0])}
                            </NameAvatarText>
                        </NameAvatar>
                    )}
                </AvatarContainer>

                <HeaderContent>
                    <Welcome>Bem vindo de volta,</Welcome>
                    <Name>{deliveryPerson.name}</Name>
                </HeaderContent>
                <ExitButton onPress={handleSignOut}>
                    <MaterialIcon
                        name="exit-to-app"
                        size={22}
                        color="rgb(233, 66, 66)"
                    />
                </ExitButton>
            </PageHeader>
            <PageMenu>
                <MenuTitle>Entregas</MenuTitle>
                <MenuOptions>
                    <MenuOption
                        onPress={() => {
                            setMenuOption('undelivered');
                        }}>
                        <MenuOptionText active={menuOption === 'undelivered'}>
                            Pendente
                        </MenuOptionText>
                    </MenuOption>
                    <MenuOption
                        onPress={() => {
                            setMenuOption('delivered');
                        }}>
                        <MenuOptionText active={menuOption === 'delivered'}>
                            Entregue
                        </MenuOptionText>
                    </MenuOption>
                </MenuOptions>
            </PageMenu>
            {packs && <PacksList navigation={navigation} />}
        </Container>
    );
}
