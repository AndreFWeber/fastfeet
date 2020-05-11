import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHeaderHeight} from 'react-navigation-stack';
import {
    Container,
    TopBackground,
    InfoContainer,
    TitleContainer,
    InfoTitle,
    InfoHeader,
    InfoValue,
    Dates,
    Date,
} from './styles';

const Details = ({navigation}) => {
    const headerHeight = useHeaderHeight();
    const pack = navigation.getParam('pack');
    console.tron.log('pack.recipient.city ', pack);
    return (
        <>
            <TopBackground />
            <Container marginTop={Math.ceil(headerHeight)}>
                <InfoContainer>
                    <TitleContainer>
                        <Icon name="local-shipping" size={20} color="#7157c1" />
                        <InfoTitle>Informações da entrega</InfoTitle>
                    </TitleContainer>
                    <InfoHeader>Destinatário</InfoHeader>
                    <InfoValue>{pack.recipient.recipient}</InfoValue>
                    <InfoHeader>Endereço de entrega</InfoHeader>
                    <InfoValue>{`${pack.recipient.street}, ${
                        pack.recipient.number
                    }, ${
                        pack.recipient.complement
                            ? `${pack.recipient.complement}, `
                            : ''
                    }${pack.recipient.city}-${pack.recipient.state}, ${
                        pack.recipient.postcode
                    }`}</InfoValue>
                    <InfoHeader>Produto</InfoHeader>
                    <InfoValue>{pack.product}</InfoValue>
                </InfoContainer>
                <InfoContainer>
                    <TitleContainer>
                        <Icon name="date-range" size={20} color="#7157c1" />
                        <InfoTitle>Situação da entrega</InfoTitle>
                    </TitleContainer>
                    <InfoHeader>Status</InfoHeader>
                    <InfoValue>Ludivig</InfoValue>
                    <Dates>
                        <Date>
                            <InfoHeader>Data de retirada</InfoHeader>
                            <InfoValue>Ludivig</InfoValue>
                        </Date>
                        <Date>
                            <InfoHeader>Data de entrega</InfoHeader>
                            <InfoValue>Ludivig</InfoValue>
                        </Date>
                    </Dates>
                </InfoContainer>
            </Container>
        </>
    );
};

Details.navigationOptions = ({navigation}) => ({
    title: 'Detalhes da encomenda',
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

export default Details;
