import produce from 'immer';

const INITIAL_STATE = {
    loading: true,
    delivered: false,
    deliveryDetailed: null,
    offset: 1,
    limit: 5,
    maxPages: 1,
    deliveryPacks: [],
};

export default function packs(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@packs/PACKAGES_REQUEST':
                draft.loading = true;
                break;
            case '@packs/PACKAGES_SUCCESS':
                draft.deliveryPacks = state.delivered === action.payload.delivered && !action.payload.forceRefresh ? [...state.deliveryPacks , ...action.payload.deliveryPacks] : [...action.payload.deliveryPacks];
                draft.delivered = action.payload.delivered;
                draft.offset = action.payload.offset;
                draft.limit = action.payload.limit;
                draft.maxPages = action.payload.pages;
                draft.loading = false;
                break;
            case '@packs/PACKAGES_DETAILED':
                draft.deliveryDetailed = action.payload.deliveryPack;
                break;
            case '@packs/PACKAGES_FAILURE':
                draft.loading = false;
                draft.deliveryDetailed = null;
                draft.deliveryPacks = [];
                break;
            case '@packs/PACKAGES_CLEAR':
                draft.loading = false;
                draft.delivered = false;
                draft.deliveryDetailed = null;
                draft.offset = 1;
                draft.limit = 5;
                draft.maxPages = 1;
                draft.deliveryPacks = [];
                break;
            default:
                return state;
        }
    });
}
