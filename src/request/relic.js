import request from '.'
export function getRelics(authority) {
    return request.get(`/relics?authority=${authority}`);
}
export function deleteRelic(data) {
    return request.post('/relic/del', {
        data
    })
}
export function editRelic(data) {
    return request.post('/editRelic', {
        data
    });
}
export function addRelic(data) {
    return request.post('/addRelic', {
        data
    });
}
export function getAllRelics() {
    return request.get('/allRelics');
}