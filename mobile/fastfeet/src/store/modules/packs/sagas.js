import {all, takeLatest, call, put} from 'redux-saga/effects';
import {ToastAndroid, Platform, AlertIOS} from 'react-native';
import api from '../../../services/api';
import {PackagesSuccess, PackagesFailure} from './actions';

export function* Packages({payload}) {
    const {id, delivered} = payload;

    try {
        const response = yield call(
            api.get,
            `deliveryperson/${id}/deliveries`,
            {params: {delivered, limit: payload.limit, offset: payload.offset}}
        );
        
        const {deliveryPack, offset, limit, pages} = response.data;

        yield put(
            PackagesSuccess(deliveryPack, delivered, limit, offset, pages, payload.forceRefresh)
        );
    } catch (error) {
        const msg = 'Erro ao buscar as entregas.';
        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
                msg,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        } else {
            AlertIOS.alert(msg);
        }

        yield put(PackagesFailure());
    }
}

export default all([takeLatest('@packs/PACKAGES_REQUEST', Packages)]);
