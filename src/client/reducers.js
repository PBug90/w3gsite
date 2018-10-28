import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import uploadReducer from './reducers/uploadReducer';

export default combineReducers({
  routing: routerReducer,
  upload: uploadReducer
});
