import React, {useState, useEffect, useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHeaderHeight} from 'react-navigation-stack';
import {format, parseISO} from 'date-fns';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import api from '../../../services/api';
import travolta from '../../../assets/travolta.png';

import {
    Background,
    Container,
    TopBackground,
    ProblemContainer,
    Description,
    Date,
    NoData,
    NoDataText,
    John,
} from './styles';

const VisualizeProblem = ({navigation}) => {
    const headerHeight = useHeaderHeight();
    const pack = navigation.getParam('pack');
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    useMemo(() => {
        const dates = problems.map((problem) => {
            problem.date = format(parseISO(pack.created_at), "dd'/'MM'/'yyyy");
            return problem;
        });
    }, [problems]);

    useEffect(() => {
        async function loadProblems() {
            try {
                const response = await api
                    .get(`/deliverypackage/${pack.id}/problems`)
                    .catch((error) => {
                        setLoading(false);
                        console.tron.log(
                            '@VisualizeProblem/loadProblems ',
                            error.response.data.error
                        );
                        // toast.error('Não foi possível buscar as encomendas.');
                    });

                if (response.status === 200) {
                    setLoading(false);
                    setProblems(response.data.deliveryProblems);
                }
            } catch (error) {
                setLoading(false);
                console.tron.log('@VisualizeProblem/loadProblems Error', error);
            }
        }
        loadProblems();
    }, []);

    return (
        <Background>
            <TopBackground />
            <Container marginTop={Math.ceil(headerHeight)}>
                {loading && (
                    <SkeletonPlaceholder>
                        <View
                            style={{
                                width: '100%',
                                height: 60,
                                borderRadius: 4,
                            }}
                        />
                    </SkeletonPlaceholder>
                )}

                {problems.length > 0
                    ? problems.map((problem) => (
                          <ProblemContainer key={problem.id}>
                              <Description>{problem.description}</Description>
                              <Date>{problem.date}</Date>
                          </ProblemContainer>
                      ))
                    : !loading && (
                          <>
                              <NoData>
                                  <NoDataText>Nenhum</NoDataText>
                                  <NoDataText>problema</NoDataText>
                                  <NoDataText>Aqui</NoDataText>
                                  <John source={travolta} />
                              </NoData>
                          </>
                      )}
            </Container>
        </Background>
    );
};

VisualizeProblem.navigationOptions = ({navigation}) => ({
    title: 'Visualizar problema',
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

export default VisualizeProblem;
