export default function(state = {uploading: false, error: false, replay: null}, action) {
  switch (action.type) {
    case 'UPLOAD_STARTED':
      return {...state, uploading: true, error: false};
    case 'UPLOAD_FAILURE':
      return {...state, uploading: false, error: action.payload};
    case 'UPLOAD_SUCCESS':
      return {...state, uploading: false, error: false, replay: action.payload};
    default:
      return state;
  }
}
