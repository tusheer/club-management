import { combineReducers } from 'redux';
import globalReducer from './globalReducer';

const rootReducer = combineReducers({
    global: globalReducer,
});

export default rootReducer;
