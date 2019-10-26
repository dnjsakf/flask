import { all, call } from 'redux-saga/effects'
import crud from './crud'

export default function* rootSaga(){
    yield all([
        call( crud )
    ])
}