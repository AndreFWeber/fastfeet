import produce from 'immer';

const INITIAL_STATE = {
    loading: false,
    delivered: false,
    deliveryDetailed: null,
    deliveryPacks: [],
};

export default function packs(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@packs/PACKAGES_REQUEST':
                draft.loading = true;
                break;
            case '@packs/PACKAGES_SUCCESS':
                draft.deliveryPacks = action.payload.deliveryPacks;
                draft.delivered = action.payload.delivered;
                draft.loading = false;
                break;
            case '@packs/PACKAGES_DETAILED':
                draft.deliveryDetailed = action.payload.deliveryPack;
                break;
            case '@packs/PACKAGES_FAILURE':
                draft.loading = false;
                break;
            case '@packs/PACKAGES_CLEAR':
                draft.loading = false;
                draft.delivered = false;
                draft.deliveryDetailed = null;
                draft.deliveryPacks = [];
                break;
            default:
                return state;
        }
    });
}
