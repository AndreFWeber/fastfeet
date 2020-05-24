export function PackagesRequest(id, delivered) {
    return {
        type: '@packs/PACKAGES_REQUEST',
        payload: {id, delivered},
    };
}

export function PackagesSuccess(deliveryPacks, delivered) {
    return {
        type: '@packs/PACKAGES_SUCCESS',
        payload: {deliveryPacks, delivered},
    };
}

export function PackageDetailed(deliveryPack) {
    return {
        type: '@packs/PACKAGES_DETAILED',
        payload: {deliveryPack},
    };
}

export function PackagesFailure() {
    return {
        type: '@packs/PACKAGES_FAILURE',
    };
}
