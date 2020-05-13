import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {format, parseISO} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHeaderHeight} from 'react-navigation-stack';
import {
    Background,
    Container,
    TopBackground,
    InfoContainer,
    TitleContainer,
    InfoTitle,
    InfoHeader,
    InfoValue,
    Dates,
    Date,
    Buttons,
    InfoButton,
    InfoButtonText,
} from './styles';

const Details = ({navigation}) => {
    const headerHeight = useHeaderHeight();
    const pack = navigation.getParam('pack');

    const dateFormatted = useMemo(() => {
        let status = 'Pendente';
        let startDate = '--/--/--';
        let endDate = '--/--/--';

        if (pack.start_date) {
            status = 'Retirada';
            startDate = format(parseISO(pack.start_date), "dd'/'MM'/'yyyy");
        }
        if (pack.end_date) {
            status = 'Entregue';
            endDate = format(parseISO(pack.end_date), "dd'/'MM'/'yyyy");
        }

        return {
            status,
            startDate,
            endDate,
        };
    }, [pack]);

    function handleNewProblem() {
        navigation.navigate('Report', {pack});
    }
    function handleViewProblems() {
        navigation.navigate('ViewProblems', {pack});
    }
    function handleDelivered() {}

    return (
        <Background>
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
                    <InfoValue>{dateFormatted.status}</InfoValue>
                    <Dates>
                        <Date>
                            <InfoHeader>Data de retirada</InfoHeader>
                            <InfoValue>{dateFormatted.startDate}</InfoValue>
                        </Date>
                        <Date>
                            <InfoHeader>Data de entrega</InfoHeader>
                            <InfoValue>{dateFormatted.endDate}</InfoValue>
                        </Date>
                    </Dates>
                </InfoContainer>
                <Buttons>
                    <InfoButton onPress={handleNewProblem}>
                        <Icon
                            name="rate-review"
                            size={30}
                            color="rgb(233, 66, 66)"
                        />
                        <InfoButtonText>Informar Problema</InfoButtonText>
                    </InfoButton>
                    <InfoButton onPress={handleViewProblems}>
                        <Icon
                            name="report"
                            size={30}
                            color="rgb(239, 192, 78)"
                        />
                        <InfoButtonText>Visualizar Problemas</InfoButtonText>
                    </InfoButton>
                    <InfoButton onPress={handleDelivered}>
                        <Icon
                            name="thumb-up"
                            size={30}
                            color="rgb(13, 161, 3)"
                        />
                        <InfoButtonText>Confirmar Entrega</InfoButtonText>
                    </InfoButton>
                </Buttons>
            </Container>
        </Background>
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
