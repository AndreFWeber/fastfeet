import produce from 'immer';

const INITIAL_STATE = {
    loading: false,
};

export default function app(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@app/SET_LOADING':
                draft.loading = true;
                break;
            default:
                return state;
        }
    });
}
