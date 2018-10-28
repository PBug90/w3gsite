function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return response.json().then((json) => Promise.reject(json));
  }
}

export default (formData) => {
  return (dispatch) => {
    dispatch({type: 'UPLOAD_STARTED'});
    fetch('/api/replay/parse', {
      method: 'POST',
      body: formData
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then((json) => dispatch({type: 'UPLOAD_SUCCESS', payload: json}))
      .catch((err) => dispatch({type: 'UPLOAD_FAILURE', payload: err.message}));
  };
};
