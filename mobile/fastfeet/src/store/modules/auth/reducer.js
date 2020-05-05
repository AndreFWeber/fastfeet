import produce from 'immer';

const INITIAL_STATE = {
    signed: false,
    loading: false,
    deliveryPerson: null,
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST':
                draft.loading = true;
                break;
            case '@auth/SIGN_IN_SUCCESS':
                draft.deliveryPerson = action.payload.deliveryPerson;
                draft.signed = true;
                draft.loading = false;
                break;
            case '@auth/SIGN_IN_FAILURE':
                draft.loading = false;
                break;
            case '@auth/SIGN_OUT':
                draft.deliveryPerson = null;
                draft.signed = false;
                break;
            default:
                return state;
        }
    });
}
