const hostname = process.env.REACT_APP_API_HOST

const checkStatusCode = (response ) => {
   if (!response.ok){
       throw new Error(response.statusText)
   }
   return response
}

const toJSON = response => response.json()

export const feedReplays = (feedid)=> {
    return fetch(`${hostname}/api/feed/${feedid}`).then(checkStatusCode).then(toJSON)
}

export const parsedReplays = ()=> {
    return fetch(`${hostname}/api/parse/`).then(checkStatusCode).then(toJSON)
}

export const loginCheck = () => {
    return fetch(`${hostname}/api/auth/login/success`).then(checkStatusCode).then(toJSON)
}

export const replayUpload = (formdata) => {
    return fetch(`${hostname}/api/parse`,{ method: 'POST',body: formdata}).then(checkStatusCode).then(toJSON)
}

export const replayParseUpload = (formdata) => {
    return fetch(`${hostname}/api/parse`,{ method: 'POST',body: formdata}).then(checkStatusCode).then(toJSON)
}
