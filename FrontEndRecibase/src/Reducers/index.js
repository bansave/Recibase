import {combineReducers} from 'redux'
import LoginReducer from './LoginReducer.js'
import selectIDreducer from './selectIDreducer.js'
import DataDetailReducer from './DataDetailReducer.js'
import SearchReducer from './SearchReducer.js'

export default combineReducers({
    login:LoginReducer,

    IDselector:selectIDreducer,

    DataDetail: DataDetailReducer,

    Search: SearchReducer
})