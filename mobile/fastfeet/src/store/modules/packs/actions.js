export function PackagesRequest(id, delivered, limit=10, offset=1, pages=1) {
    return {
        type: '@packs/PACKAGES_REQUEST',
        payload: {id, delivered, limit, offset, pages},
    };
}

export function PackagesSuccess(deliveryPacks, delivered, limit, offset, pages) {
    return {
        type: '@packs/PACKAGES_SUCCESS',
        payload: {deliveryPacks, delivered, limit, offset, pages},
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

export function PackagesClear() {
    return {
        type: '@packs/PACKAGES_CLEAR',
    };
}
