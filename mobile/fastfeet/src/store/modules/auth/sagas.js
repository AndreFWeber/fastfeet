import {Alert} from 'react-native';
import {all, takeLatest, call, put} from 'redux-saga/effects';
import api from '../../../services/api';
import {signInSuccess, signInFailure} from './actions';
// import history from '../../../services/history';

export function* signIn({payload}) {
    const {id} = payload;

    try {
        const response = yield call(api.get, `deliveryperson/${id}`);

        const {deliveryPerson} = response.data;

        console.tron.log(
            'api.defaults.headers.Authorization',
            api.defaults.headers.Authorization
        );

        yield put(signInSuccess(deliveryPerson));
    } catch (error) {
        Alert('Falha no login', 'Usuário não encontrado');
        yield put(signInFailure());
    }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
