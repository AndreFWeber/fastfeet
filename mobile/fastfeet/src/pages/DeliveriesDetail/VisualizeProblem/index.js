import React, {useState, useEffect, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHeaderHeight} from 'react-navigation-stack';
import {format, parseISO} from 'date-fns';
import api from '../../../services/api';

import {
    Background,
    Container,
    TopBackground,
    ProblemContainer,
    Description,
    Date,
} from './styles';

const VisualizeProblem = ({navigation}) => {
    const headerHeight = useHeaderHeight();
    const pack = navigation.getParam('pack');
    const [problems, setProblems] = useState([]);

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
                        console.tron.log(
                            '@VisualizeProblem/loadProblems ',
                            error.response.data.error
                        );
                        // toast.error('Não foi possível buscar as encomendas.');
                    });

                if (response.status === 200) {
                    setProblems(response.data.deliveryProblems);
                }
            } catch (error) {
                console.tron.log('@VisualizeProblem/loadProblems Error', error);
            }
        }
        loadProblems();
    }, []);

    return (
        <Background>
            <TopBackground />
            <Container marginTop={Math.ceil(headerHeight)}>
                {problems &&
                    problems.map((problem) => (
                        <ProblemContainer key={problem.id}>
                            <Description>{problem.description}</Description>
                            <Date>{problem.date}</Date>
                        </ProblemContainer>
                    ))}
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
