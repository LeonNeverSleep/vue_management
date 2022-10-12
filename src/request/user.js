import request from '.'
export function getUsers() {
    return request.get('/users');
}