import {all} from 'redux-saga/effects';
import auth from './auth/sagas';
import app from './app/sagas';
import packs from './packs/sagas';

export default function* rootSaga() {
    return yield all([auth, app, packs]);
}
