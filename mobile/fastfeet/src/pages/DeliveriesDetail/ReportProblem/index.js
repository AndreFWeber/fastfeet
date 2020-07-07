import React, {useState} from 'react';
import {TouchableOpacity, input} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHeaderHeight} from 'react-navigation-stack';
import api from '../../../services/api';

import {
    Background,
    Container,
    TopBackground,
    ProblemTextBox,
    SubmitButton,
} from './styles';

const ReportProblem = ({navigation}) => {
    const headerHeight = useHeaderHeight();
    const pack = navigation.getParam('pack');
    const [description, setDescription] = useState('');

    async function handleSend() {
        try {
            const response = await api
                .post(`/deliverypackage/${pack.id}/problems`, {
                    description,
                })
                .catch((error) => {
                    // toast.error('Não foi possível cadastrar o usuário.');
                    console.tron.log('@ReportProblem/handleSend Error', error);
                });
            if (response.status === 200) {
                navigation.goBack();
                // toast.success('Encomenda cadastrada com sucesso.');
            }
        } catch (error) {
            console.tron.log('@ReportProblem/handleSend Error', error);
        }
    }

    return (
        <Background>
            <TopBackground />
            <Container marginTop={Math.ceil(headerHeight)}>
                <ProblemTextBox
                    multiline
                    autoFocus
                    numberOfLines={4}
                    placeholder="Descrição do problema ocorrido com a entrega."
                    onChangeText={(text) => setDescription(text)}
                    description={description}
                />
                <SubmitButton onPress={handleSend}>Enviar</SubmitButton>
            </Container>
        </Background>
    );
};

ReportProblem.navigationOptions = ({navigation}) => ({
    title: 'Informar problema',
    headerTitleAlign: 'center',
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}>
            <Icon name="chevron-left" size={20} color="#FFF" />
        </TouchableOpacity>
    ),
});

export default ReportProblem;
