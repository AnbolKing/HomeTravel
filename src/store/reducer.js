import { combineReducers } from 'redux-immutable';
import { reducer as mapReducer} from '../pages/maps/store/index';

const reducer = combineReducers({
  mapReducer:mapReducer
})

export default reducer;