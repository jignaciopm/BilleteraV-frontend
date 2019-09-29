export default function authHeader(token) {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        'Accept' : 'application/json, text/plain, */*',
        'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials' : false
    }
}