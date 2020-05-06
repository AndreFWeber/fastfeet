import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {setLoader} from '../../store/modules/app/actions';
import api from '../../services/api';
import PacksList from '../../components/PackList/List';
import {
    Container,
    PageHeader,
    Avatar,
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

export default function Dashboard() {
    const [menuOption, setMenuOption] = useState('undelivered');
    const [packs, setPacks] = useState([]);
    const deliveryPerson = useSelector((state) => state.auth.deliveryPerson);
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadPackages() {
            try {
                dispatch(setLoader(true));

                const response = await api
                    .get(`deliveryperson/${deliveryPerson.id}/deliveries`, {
                        params: {delivered: menuOption === 'delivered'},
                    })
                    .catch((error) => {
                        dispatch(setLoader(false));
                        console.tron.log(
                            '@Dashboard/loadPackages ',
                            error.response.data.error
                        );
                        // toast.error('Não foi possível buscar as encomendas.');
                    });

                if (response.status === 200) {
                    setPacks(response.data.deliveryPack);
                }
                dispatch(setLoader(false));
            } catch (error) {
                console.tron.log('@Dashboard/loadPackages Error', error);
                dispatch(setLoader(false));
            }
        }
        setPacks([]);
        loadPackages();
    }, [menuOption]);

    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <PageHeader>
                <Avatar
                    source={{
                        uri: 'https://api.adorable.io/avatar/50/teste',
                    }}
                />
                <HeaderContent>
                    <Welcome>Bem vindo de volta,</Welcome>
                    <Name>{deliveryPerson.name}</Name>
                </HeaderContent>
                <ExitButton>
                    <Icon
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
            {packs && <PacksList packs={packs} />}
        </Container>
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Entregas',
    tabBarIcon: ({tintColor}) => (
        <Icon name="event" size={20} color={tintColor} />
    ),
};
