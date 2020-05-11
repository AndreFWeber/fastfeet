import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {format, parseISO} from 'date-fns';

import {
    PackContainer,
    PackTitle,
    PackHeader,
    PackStatus,
    Ball,
    StatusLegend,
    Legend,
    Line,
    PackInfo,
    Info,
    InfoHeader,
    InfoValue,
    InfoDetails,
    DetailText,
} from './styles';

const Pack = ({pack, navigation}) => {
    const dateFormatted = useMemo(
        () => format(parseISO(pack.created_at), "dd'/'MM'/'yyyy"),
        [pack]
    );

    return (
        <PackContainer>
            <PackHeader>
                <Icon name="local-shipping" size={20} color="#7157c1" />
                <PackTitle>{`Encomenda ${pack.id}`}</PackTitle>
            </PackHeader>

            <PackStatus>
                <Ball done />
                <Line />
                <Ball done={pack.start_date} />
                <Line />
                <Ball done={pack.end_date} />
            </PackStatus>
            <StatusLegend>
                <Legend>Aguardando retirada</Legend>
                <Legend>Retirada</Legend>
                <Legend>Entregue</Legend>
            </StatusLegend>

            <PackInfo>
                <Info>
                    <InfoHeader>Data</InfoHeader>
                    <InfoValue>{dateFormatted}</InfoValue>
                </Info>
                <Info>
                    <InfoHeader>Cidade</InfoHeader>
                    <InfoValue>{pack.recipient.city}</InfoValue>
                </Info>
                <InfoDetails
                    onPress={() => {
                        navigation.navigate('Detail', {pack});
                    }}>
                    <DetailText>Ver Detalhes</DetailText>
                </InfoDetails>
            </PackInfo>
        </PackContainer>
    );
};

Pack.propTypes = {
    pack: PropTypes.shape().isRequired,
};

export default Pack;
