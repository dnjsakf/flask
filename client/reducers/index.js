import { combineReducers } from 'redux'
import crudReducer from './crud'

const rootReducer = combineReducers({
    crud: crudReducer
})

export default rootReducer