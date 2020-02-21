const hostname = process.env.REACT_APP_API_HOST

export const feedReplays = (feedid)=> {
    return fetch(`${hostname}/api/feed/${feedid}`).then((response) =>response.json())
}
export const loginCheck = () => {
    return fetch(`${hostname}/api/auth/login/success`).then((response) => response.json())
}
export const replayUpload = (formdata) => {
    return fetch(`${hostname}/api/replay/parse`,{ method: 'POST',body: formdata})
}
