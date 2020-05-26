import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {format, parseISO} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {PackageDetailed} from '../../../store/modules/packs/actions';
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
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.packs.loading);
    const dateFormatted = useMemo(() => {
        if (!loading) format(parseISO(pack.created_at), "dd'/'MM'/'yyyy");
    }, [pack]);

    function showDetails() {
        dispatch(PackageDetailed(pack));
        navigation.navigate('Detail' /* {pack} */);
    }

    return (
        <PackContainer>
            {loading ? (
                <SkeletonPlaceholder>
                    <View
                        style={{
                            width: '50%',
                            height: 40,
                            margin: 10,
                            borderRadius: 4,
                        }}
                    />
                    <View
                        style={{
                            width: '95%',
                            marginLeft: '2.5%',
                            height: 20,
                            marginTop: 20,
                            marginBottom: 20,
                            borderRadius: 4,
                        }}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'rgb(248, 249, 253)',
                            height: 70,
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            width: '100%',
                        }}>
                        <View
                            style={{
                                marginTop: 6,
                                width: 80,
                                height: 45,
                                borderRadius: 4,
                            }}
                        />
                        <View
                            style={{
                                marginTop: 6,
                                width: 80,
                                height: 45,
                                borderRadius: 4,
                            }}
                        />
                        <View
                            style={{
                                marginTop: 6,
                                width: 80,
                                height: 45,
                                borderRadius: 4,
                            }}
                        />
                    </View>
                </SkeletonPlaceholder>
            ) : (
                <>
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
                        <InfoDetails onPress={showDetails}>
                            <DetailText>Ver Detalhes</DetailText>
                        </InfoDetails>
                    </PackInfo>
                </>
            )}
        </PackContainer>
    );
};

Pack.propTypes = {
    pack: PropTypes.shape().isRequired,
};

export default Pack;
