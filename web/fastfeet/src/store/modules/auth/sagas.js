import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { signInSuccess, signInFailure } from './actions';
import history from '../../../services/history';

export function* signIn({ payload }) {
	const { email, password } = payload;

	try {
		const response = yield call(api.post, 'session', {
			email,
			password,
		});

		const { token, user } = response.data;

		api.defaults.headers.Authorization = `Bearer ${token}`;

		console.tron.log(
			'api.defaults.headers.Authorization',
			api.defaults.headers.Authorization
		);

		yield put(signInSuccess(token, user));

		history.push('/packages');
	} catch (error) {
		toast.error('Falha na autenticação, verifique seus dados');
		yield put(signInFailure());
	}
}

export function setToken({ payload }) {
	if (!payload) {
		return;
	}
	const { token } = payload.auth;

	if (token) {
		api.defaults.headers.Authorization = `Bearer ${token}`;
	}
}

export function signOut() {
	history.push('/');
}

export default all([
	takeLatest('@auth/SIGN_IN_REQUEST', signIn),
	takeLatest('persist/REHYDRATE', setToken),
	takeLatest('@auth/SIGN_OUT', signOut),
]);
