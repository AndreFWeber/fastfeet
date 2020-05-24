import {all, takeLatest, call, put} from 'redux-saga/effects';
import api from '../../../services/api';
import {PackagesSuccess, PackagesFailure} from './actions';
// import history from '../../../services/history';

export function* Packages({payload}) {
    const {id, delivered} = payload;

    try {
        const response = yield call(
            api.get,
            `deliveryperson/${id}/deliveries`,
            {params: {delivered}}
        );

        const {deliveryPack} = response.data;
        yield put(PackagesSuccess(deliveryPack, delivered));
    } catch (error) {
        yield put(PackagesFailure());
    }
}

export default all([takeLatest('@packs/PACKAGES_REQUEST', Packages)]);
