import {all, takeLatest, call, put} from 'redux-saga/effects';
import {ToastAndroid, Platform, AlertIOS} from 'react-native';
import api from '../../../services/api';
import {signInSuccess, signInFailure} from './actions';

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
        const msg = 'Não foi possível logar.';
        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
                msg,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        } else {
            AlertIOS.alert(msg);
        }

        yield put(signInFailure());
    }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
