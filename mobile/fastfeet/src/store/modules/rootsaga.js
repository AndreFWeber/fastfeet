import {all} from 'redux-saga/effects';
import auth from './auth/sagas';
import app from './app/sagas';

export default function* rootSaga() {
    return yield all([auth, app]);
}
