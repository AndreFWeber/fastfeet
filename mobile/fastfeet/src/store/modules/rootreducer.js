import {combineReducers} from 'redux';
import auth from './auth/reducer';
import app from './app/reducer';
import packs from './packs/reducer';

export default combineReducers({
    auth,
    app,
    packs,
});
