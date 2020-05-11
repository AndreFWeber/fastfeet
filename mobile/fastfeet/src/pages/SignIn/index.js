import React, {useState} from 'react';
import {StatusBar, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signInRequest} from '../../store/modules/auth/actions';
import logo from '../../assets/fastfeet-logo-white.png';
import {Container, Form, FormInput, SubmitButton} from './styles';
import Background from '../../components/Background';

export default function SignIn() {
    const [id, setId] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);

    function handleSignIn() {
        dispatch(signInRequest(id));
    }

    return (
        <Background>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <Container>
                <Image source={logo} styles={{width: 50}} />
                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="numeric"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Informe seu ID de cadastro"
                        value={id}
                        onChangeText={setId}
                    />
                    <SubmitButton onPress={handleSignIn} loading={loading}>
                        Entrar
                    </SubmitButton>
                </Form>
            </Container>
        </Background>
    );
}
