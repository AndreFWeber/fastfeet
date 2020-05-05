export function setLoader(loading) {
    return {
        type: '@app/SET_LOADING',
        payload: {loading},
    };
}
