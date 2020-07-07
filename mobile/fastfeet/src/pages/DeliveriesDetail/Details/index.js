import React, { useMemo, useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useHeaderHeight } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import Toaster from '../../../components/Toaster';
import {
    PackagesRequest,
    PackageDetailed,
} from '../../../store/modules/packs/actions';

import api from '../../../services/api';
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
    DateC,
    Buttons,
    InfoButton,
    InfoButtonText,
} from './styles';

const Details = ({ navigation }) => {
    const headerHeight = useHeaderHeight();
    const pack = useSelector((state) => state.packs.deliveryDetailed);
    const limit = useSelector((state) => state.packs.limit);
    const deliveryPerson = useSelector((state) => state.auth.deliveryPerson);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [messageToast, setMessageToast] = useState("");
    const dispatch = useDispatch();

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
        navigation.navigate('Report', { pack });
    }
    function handleViewProblems() {
        navigation.navigate('ViewProblems', { pack });
    }

    async function handleDeliveryStatus() {
        if (dateFormatted.status === 'Pendente') {
            const date = new Date().toISOString();

            const confirmResponse = await api
                .put('deliverypackage/deliveries', {
                    package_id: pack.id,
                    deliveryperson_id: deliveryPerson.id,
                    start_date: date,
                })
                .catch((error) => {
                    try {
                        if ("Package collection must occur between 08:00 and 18:00h." === error.response.data.error) {
                            setShowErrorToast(true); 
                            setMessageToast("Coleta de pacotes só é permitida entre as 08:00h e 18:00h");
                        } else if ("A delivery person may take out at most 5 packages a day." === error.response.data.error) {
                            setShowErrorToast(true); 
                            setMessageToast("Um entregador pode retirar no máximo 5 entragas por dia.");
                        }
                        console.tron.log(
                            '@ConfirmDelivery/handleDeliveryStatus Error',
                            error.response.data.error
                        );
                    } catch (error) {
                        console.tron.log(
                            '@ConfirmDelivery/handleDeliveryStatus Error',
                            error
                        );
                    }
                });
            if (confirmResponse && confirmResponse.status === 200) {
                dispatch(PackagesRequest(1, false, limit, 1, true));
                dispatch(PackageDetailed(confirmResponse.data.updatedPack));
                console.tron.log(confirmResponse.data);
            }
        } else {
            navigation.navigate('ConfirmDelivery', { pack });
        }
    }

    return (
        <Background>
            <Toaster
                message={messageToast}
                visible={showErrorToast}
                backgroundColor="red"
                onHidden={() => {setShowErrorToast(false);}}
            />
            <TopBackground />
            <Container marginTop={Math.ceil(headerHeight)}>
                <ScrollView>
                    {pack && (
                        <>
                            <InfoContainer>
                                <TitleContainer>
                                    <Icon
                                        name="local-shipping"
                                        size={20}
                                        color="#7157c1"
                                    />
                                    <InfoTitle>
                                        Informações da entrega
                                    </InfoTitle>
                                </TitleContainer>
                                <InfoHeader>Destinatário</InfoHeader>
                                <InfoValue>
                                    {pack.recipient.recipient}
                                </InfoValue>
                                <InfoHeader>Endereço de entrega</InfoHeader>
                                <InfoValue>{`${pack.recipient.street}, ${
                                    pack.recipient.number
                                    }, ${
                                    pack.recipient.complement
                                        ? `${pack.recipient.complement}, `
                                        : ''
                                    }${pack.recipient.city}-${
                                    pack.recipient.state
                                    }, ${pack.recipient.postcode}`}</InfoValue>
                                <InfoHeader>Produto</InfoHeader>
                                <InfoValue>{pack.product}</InfoValue>
                            </InfoContainer>
                            <InfoContainer>
                                <TitleContainer>
                                    <Icon
                                        name="date-range"
                                        size={20}
                                        color="#7157c1"
                                    />
                                    <InfoTitle>Situação da entrega</InfoTitle>
                                </TitleContainer>
                                <InfoHeader>Status</InfoHeader>
                                <InfoValue>{dateFormatted.status}</InfoValue>
                                <Dates>
                                    <DateC>
                                        <InfoHeader>
                                            Data de retirada
                                        </InfoHeader>
                                        <InfoValue>
                                            {dateFormatted.startDate}
                                        </InfoValue>
                                    </DateC>
                                    <DateC>
                                        <InfoHeader>Data de entrega</InfoHeader>
                                        <InfoValue>
                                            {dateFormatted.endDate}
                                        </InfoValue>
                                    </DateC>
                                </Dates>
                            </InfoContainer>
                            <Buttons>
                                <InfoButton onPress={handleNewProblem}>
                                    <Icon
                                        name="rate-review"
                                        size={30}
                                        color="rgb(233, 66, 66)"
                                    />
                                    <InfoButtonText>
                                        Informar Problema
                                    </InfoButtonText>
                                </InfoButton>
                                <InfoButton onPress={handleViewProblems}>
                                    <Icon
                                        name="report"
                                        size={30}
                                        color="rgb(239, 192, 78)"
                                    />
                                    <InfoButtonText>
                                        Visualizar Problemas
                                    </InfoButtonText>
                                </InfoButton>
                                {dateFormatted.status !== 'Entregue' && (
                                    <InfoButton onPress={handleDeliveryStatus}>
                                        <Icon
                                            name={
                                                dateFormatted.status ===
                                                    'Pendente'
                                                    ? 'work'
                                                    : 'thumb-up'
                                            }
                                            size={30}
                                            color="rgb(13, 161, 3)"
                                        />
                                        <InfoButtonText>
                                            {dateFormatted.status === 'Pendente'
                                                ? 'Confirmar Retirada'
                                                : 'Confirmar Entrega'}
                                        </InfoButtonText>
                                    </InfoButton>
                                )}
                            </Buttons>
                        </>
                    )}
                </ScrollView>
            </Container>
        </Background>
    );
};

Details.navigationOptions = ({ navigation }) => ({
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
