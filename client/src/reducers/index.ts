import { combineReducers } from 'redux';
import membersReducer from './membersReducer';

const rootReducer = combineReducers({
    members: membersReducer,
});

export default rootReducer;
