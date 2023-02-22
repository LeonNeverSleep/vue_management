import request from '.'
export function getUsers() {
    return request.get("/users");
}
export function deleteUser(data) {
    return request.post('/user/del', {
        data
    })
}
export function login(data) {
    return request.post('/login', {
        data
    });
}
export function reg(data) {
    return request.post('/reg', {
        data
    });
}
export function edit(data) {
    return request.post('/edit', {
        data
    });
}
export function recordEnv(data) {
    return request.post('/recordEnv', {
        data
    })
}