import { all, call, put, fork, takeLatest } from 'redux-saga/effects'
import { SELECT, SELECT_SUCCESS, SELECT_FAILURE } from '../reducers/crud'

import axios from 'axios'

function onSelect( options ){
    console.log( 'called onSelect', options );
    return axios( options );
}

function* handleSelect( action ){
    try {
        const response = yield call( onSelect, action.payload );
        console.log( 'response', response )
        yield put({
            type: SELECT_SUCCESS
            , payload: response
        })
    } catch ( error ){
        console.error( error );
        yield put({
            type: SELECT_FAILURE
        })
    }
}

function* watchSelect(){
    yield takeLatest( SELECT, handleSelect )
}

// Create Generator function
export default function* crudSaga(){
    yield all([
        fork( watchSelect )
    ])
}